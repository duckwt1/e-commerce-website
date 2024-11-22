import { endpointBE } from '../layouts/utils/Constant';
import ProductModel from '../model/ProductModel';
import { getAllImageByProduct } from './ImageAPI';
import { request, requestAdmin } from './Request';

interface resultInterface {
    productList: ProductModel[];
}

async function getProduct(endpoint: string): Promise<resultInterface> {
    const response = await request(endpoint);

    if (!Array.isArray(response)) {
        throw new Error("Response does not contain a list of products");
    }

    const productList: ProductModel[] = response.map((productData: any) => {
        const productId = productData.id;
        const name = productData.name;
        const description = productData.description;
        const avgRating = productData.avgRating;
        const listPrice = productData.listPrice;
        const sellPrice = productData.sellPrice;
        const quantity = productData.quantity;
        const soldQuantity = productData.soldQuantity;
        const thumbnail = "";
        const relatedImg: string[] = [];

        return new ProductModel(
            productId,
            name,
            description,
            avgRating,
            listPrice,
            sellPrice,
            quantity,
            soldQuantity,
            thumbnail,
            relatedImg
        );
    });

    const productList1 = await Promise.all(
        productList.map(async (product: ProductModel) => {
            if (!product.productId) {
                console.error("productId is undefined or null for product:", product);
                return product;
            }
            const responseImg = await getAllImageByProduct(product.productId);

            const thumbnail = responseImg.find(image => image.isThumbnail === true)?.urlImage || "default_thumbnail.jpg";
            const relatedImg = responseImg.map(image => image.urlImage);

            return {
                ...product,
                thumbnail,
                relatedImg,
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

export async function get3BestSellerBooks(): Promise<ProductModel[]> {
    const endpoint: string = `${endpointBE}/books?sort=soldQuantity,desc&size=3`;
    let productList = await getProduct(endpoint);

    let newBookList = await Promise.all(productList.productList.map(async (product: ProductModel) => {
        const responseImg = await getAllImageByProduct(product.productId);
        const thumbnail = responseImg.filter(image => image.isThumbnail);
        return {
            ...product,
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

export async function getProductById(productId: number): Promise<ProductModel | null> {
    const endpoint = `${endpointBE}/api/product/${productId}`;
    try {
        const response = await request(endpoint);

        if (response) {
            const productResponse: ProductModel = {
                productId: response.id,
                name: response.name,
                description: response.description,
                avgRating: response.avgRating || NaN,
                listPrice: response.listPrice,
                sellPrice: response.sellPrice,
                quantity: response.quantity,
                soldQuantity: response.soldQuantity || NaN,
                thumbnail: response.images.find((image: any) => image.isThumbnail)?.urlImage || "",
                relatedImg: response.images.map((image: any) => image.urlImage)
            };
            return productResponse;
        } else {
            throw new Error("Product does not exist");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}


export async function getBookByIdCartItem(idCart: number): Promise<ProductModel | null> {
    const endpoint = `${endpointBE}/cart-items/${idCart}/book`;

    try {
        const response = await request(endpoint);

        if (response) {
            return {
                productId: response.product_id,
                name: response.product_name,
                description: response.book_description,
                avgRating: response.book_avg_rating,
                sellPrice: response.book_sell_price,
                listPrice: response.book_list_price,
                quantity: response.book_quantity,
                soldQuantity: response.book_sold_quantity,
                thumbnail: "", // Sẽ được cập nhật sau
                relatedImg: []
            };
        } else {
            throw new Error("Sách không tồn tại");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

// export async function getTotalNumberOfBooks(): Promise<number> {
//     const endpoint = `${endpointBE}/book/get-total`;
//     try {
//         const response = await requestAdmin(endpoint);
//         if (response) {
//             return response;
//         }
//     } catch (error) {
//         throw new Error("Lỗi không gọi được endpoint lấy tổng cuốn sách\n" + error);
//     }
//     return 0;
// }
