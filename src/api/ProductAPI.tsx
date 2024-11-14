import { endpointBE } from '../layouts/utils/Constant';
import BookModel from '../model/ProductModel';
import { getAllImageByProduct } from './ImageAPI';
import { request, requestAdmin } from './Request';
import ProductModel from "../model/ProductModel";

interface resultInterface {
    productList: ProductModel[];
}

async function getProduct(endpoint: string): Promise<resultInterface> {
    const response = await request(endpoint);

    // Ánh xạ các trường từ database sang ProductModel
    const productList: BookModel[] = response._embedded.books.map((bookData: BookModel) => ({
        ...bookData,
    }));

    // Lấy ảnh cho từng sản phẩm
    const productList1 = await Promise.all(
        productList.map(async (product: ProductModel) => {
            if (!product.idBook) {
                throw new Error("idProduct is undefined or null");
            }
            const responseImg = await getAllImageByProduct(product.idBook);

            const thumbnail = responseImg.find(image => image.thumbnail)?.urlImage || "";
            const relatedImg = responseImg.map(image => image.urlImage).filter((url): url is string => !!url); // Lưu trữ tất cả URL ảnh và loại bỏ undefined

            return {
                ...product,
                thumbnail,      // Ảnh thumbnail
                relatedImg,     // Danh sách tất cả ảnh
            };
        })
    );

    return { productList: productList1 };
}

    export async function getAllProduct(size?: number, page?: number): Promise<resultInterface> {
    if (!size) {
        size = 8;
    }

    const endpoint: string = `${endpointBE}/books?sort=idBook,desc&size=${size}&page=${page}`;
    return getProduct(endpoint);
}

export async function getHotProduct(): Promise<resultInterface> {
    const endpoint: string = "http://localhost:8080/api/product";
    return getProduct(endpoint);
}

export async function getNewBook(): Promise<resultInterface> {
    const endpoint: string = `${endpointBE}/books?sort=idBook,desc&size=4`;
    return getProduct(endpoint);
}

export async function get3BestSellerBooks(): Promise<BookModel[]> {
    const endpoint: string = `${endpointBE}/books?sort=soldQuantity,desc&size=3`;
    let bookList = await getProduct(endpoint);

    let newBookList = await Promise.all(bookList.productList.map(async (book: any) => {
        const responseImg = await getAllImageByProduct(book.idProduct);
        const thumbnail = responseImg.filter(image => image.thumbnail);
        return {
            ...book,
            thumbnail: thumbnail.length > 0 ? thumbnail[0].urlImage : "default_thumbnail.jpg",
        };
    }));

    return newBookList;
}

export async function searchBook(keySearch?: string, idGenre?: number, filter?: number, size?: number, page?: number): Promise<resultInterface> {
    if (keySearch) {
        keySearch = keySearch.trim();
    }

    const optionsShow = `size=${size}&page=${page}`;
    let endpoint: string = `${endpointBE}/books?${optionsShow}`;

    let filterEndpoint = '';
    if (filter === 1) {
        filterEndpoint = "sort=nameBook";
    } else if (filter === 2) {
        filterEndpoint = "sort=nameBook,desc";
    } else if (filter === 3) {
        filterEndpoint = "sort=sellPrice";
    } else if (filter === 4) {
        filterEndpoint = "sort=sellPrice,desc";
    } else if (filter === 5) {
        filterEndpoint = "sort=soldQuantity,desc";
    }

    if (keySearch !== '') {
        endpoint = `${endpointBE}/books/search/findByNameBookContaining?nameBook=${keySearch}&${optionsShow}&${filterEndpoint}`;
    }

    if (idGenre !== undefined) {
        if (keySearch === '' && idGenre > 0) {
            endpoint = `${endpointBE}/books/search/findByListGenres_idGenre?idGenre=${idGenre}&${optionsShow}&${filterEndpoint}`;
        }

        if (keySearch !== '' && idGenre > 0) {
            endpoint = `${endpointBE}/books/search/findByNameBookContainingAndListGenres_idGenre?nameBook=${keySearch}&idGenre=${idGenre}&${optionsShow}&${filterEndpoint}`;
        }

        if (keySearch === '' && (idGenre === 0 || typeof (idGenre) === 'string')) {
            endpoint = `${endpointBE}/books?${optionsShow}&${filterEndpoint}`;
        }
    }

    return getProduct(endpoint);
}

export async function getProductById(productId: number): Promise<BookModel | null> {
    let bookResponse: BookModel = {
        idBook: 0,
        nameBook: "",
        author: "",
        description: "",
        listPrice: NaN,
        sellPrice: NaN,
        quantity: NaN,
        avgRating: NaN,
        soldQuantity: NaN,
        discountPercent: NaN,
        thumbnail: "",
    }
    const endpoint = endpointBE + `/books/${productId}`;
    try {
        // Gọi phương thức request()
        const response = await request(endpoint);

        // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
        if (response) {
            bookResponse = response;
            // Trả về quyển sách
            const responseImg = await getAllImageByProduct(response.idBook);
            const thumbnail = responseImg.filter(image => image.thumbnail);
            return {
                ...bookResponse,
                thumbnail: thumbnail[0].urlImage,
            };
        } else {
            throw new Error("Sách không tồn tại");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export async function getBookByIdCartItem(idCart: number): Promise<BookModel | null> {
    const endpoint = `${endpointBE}/cart-items/${idCart}/book`;

    try {
        const response = await request(endpoint);

        if (response) {
            return {
                idBook: response.book_id,
                nameBook: response.book_name,
                description: response.book_description,
                author: response.book_author,
                avgRating: response.book_avg_rating,
                sellPrice: response.book_sell_price,
                listPrice: response.book_list_price,
                soldQuantity: response.book_sold_quantity,
                discountPercent: response.book_discount_percent,
                quantity: response.book_quantity,
                thumbnail: "", // Sẽ được cập nhật sau
            };
        } else {
            throw new Error("Sách không tồn tại");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export async function getTotalNumberOfBooks(): Promise<number> {
    const endpoint = `${endpointBE}/book/get-total`;
    try {
        const response = await requestAdmin(endpoint);
        if (response) {
            return response;
        }
    } catch (error) {
        throw new Error("Lỗi không gọi được endpoint lấy tổng cuốn sách\n" + error);
    }
    return 0;
}
