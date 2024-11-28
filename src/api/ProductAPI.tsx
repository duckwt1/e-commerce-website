import { endpointBE } from '../layouts/utils/Constant';
import ProductModel from '../model/ProductModel';
import { getAllImageByProduct } from './ImageAPI';
import { request, requestAdmin } from './Request';
import {getCategoryByIdProduct} from "./CategoryAPI";
import categoryModel from "../model/CategoryModel";



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
        const discountPercent = productData.discount_percent;
        const thumbnail = "";
        const relatedImg: string[] = [];
        const categoryList: categoryModel[] = [];

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
            relatedImg,
            categoryList,
            discountPercent

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

    const endpoint: string = `${endpointBE}/api/product?sort=idProduct,desc&size=${size}&page=${page}`;
    return getProduct(endpoint);
}

export async function getHotProduct(): Promise<resultInterface> {
    const endpoint: string = "http://localhost:8080/api/product";
    return getProduct(endpoint);
}

export async function getNewProduct(): Promise<resultInterface> {
    const endpoint: string = `${endpointBE}/product?sort=idProduct,desc&size=4`;
    return getProduct(endpoint);
}

export async function get3BestSellerProducts(): Promise<ProductModel[]> {
    const endpoint: string = `${endpointBE}/product?sort=soldQuantity,desc&size=3`;
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

export async function searchProduct(keySearch?: string, idGenre?: number, filter?: number, size?: number, page?: number): Promise<resultInterface> {
    if (keySearch) {
        keySearch = keySearch.trim();
    }

    const optionsShow = `size=${size}&page=${page}`;
    let endpoint: string = `${endpointBE}/api/product?${optionsShow}`;

    let filterEndpoint = '';
    if (filter === 1) {
        filterEndpoint = "sort=nameProduct";
    } else if (filter === 2) {
        filterEndpoint = "sort=nameProduct,desc";
    } else if (filter === 3) {
        filterEndpoint = "sort=sellPrice";
    } else if (filter === 4) {
        filterEndpoint = "sort=sellPrice,desc";
    } else if (filter === 5) {
        filterEndpoint = "sort=soldQuantity,desc";
    }

    if (keySearch !== '') {
        endpoint = `${endpointBE}/api/product/search/findByNameBookContaining?nameProduct=${keySearch}&${optionsShow}&${filterEndpoint}`;
    }

    if (idGenre !== undefined) {
        if (keySearch === '' && idGenre > 0) {
            endpoint = `${endpointBE}/api/product/search/findByListGenres_idGenre?idGenre=${idGenre}&${optionsShow}&${filterEndpoint}`;
        }

        if (keySearch !== '' && idGenre > 0) {
            endpoint = `${endpointBE}/api/product/search/findByNameBookContainingAndListGenres_idGenre?nameBook=${keySearch}&idGenre=${idGenre}&${optionsShow}&${filterEndpoint}`;
        }

        if (keySearch === '' && (idGenre === 0 || typeof (idGenre) === 'string')) {
            endpoint = `${endpointBE}/api/product?${optionsShow}&${filterEndpoint}`;
        }
    }

    return getProduct(endpoint);
}

export async function getProductById(productId: number): Promise<ProductModel | null> {
    const endpoint = `${endpointBE}/api/product/${productId}`;
    try {
        const response = await request(endpoint);
            console.log(response);
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
                relatedImg: response.images.map((image: any) => image.urlImage),
                categoryList: [],
                discountPercent: response.discount_percent,
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


export async function getProductByIdCartItem(idCart: number): Promise<ProductModel | null> {
    const endpoint = `${endpointBE}/cart-items/${idCart}/book`;

    try {
        const response = await request(endpoint);

        if (response) {
            return {
                productId: response.product_id,
                name: response.name,
                description: response.description,
                avgRating: response.avgRating,
                sellPrice: response.sell_price,
                listPrice: response.list_price,
                quantity: response.quantity,
                soldQuantity: response.soldQuantity,
                thumbnail: "", // Sẽ được cập nhật sau
                relatedImg: [],
                categoryList: [],
                discountPercent: response.discount_percent,
            };
        } else {
            throw new Error("Sách không tồn tại");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export async function getTotalNumberOfProducts(): Promise<number> {
    const endpoint = `${endpointBE}/product/get-total`;
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



// Lấy sách theo id (lấy thumbnail, ảnh liên quan, thể loại)
export async function getProductByIdAllInformation(idProduct: number): Promise<ProductModel | null> {
    let productResponse: ProductModel = {
        productId: 0,
        name: "",
        description: "",
        listPrice: NaN,
        sellPrice: NaN,
        quantity: NaN,
        avgRating: NaN,
        soldQuantity: NaN,
        thumbnail: "",
        relatedImg: [],
        categoryList: [],
        discountPercent: NaN,
    };

    try {
        const response = await getProductById(idProduct);

        if (response) {
            productResponse = response;

            const imagesList = await getAllImageByProduct(response.productId);
            const thumbnail = imagesList.find((image) => image.isThumbnail)?.urlImage || "default_thumbnail.jpg";
            const relatedImg = imagesList.map((image) => !image.isThumbnail ? image.urlImage : null).filter(Boolean) as string[];
            productResponse = { ...productResponse, relatedImg, thumbnail };

            const cateList = await getCategoryByIdProduct(response.productId);
            const categoryList = cateList.categoryList.map((category) => ({ idCategory: category.idCategory, name: category.name }));
            productResponse = { ...productResponse, categoryList };

            return productResponse;
        } else {
            throw new Error("Product does not exist");
        }

    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}
