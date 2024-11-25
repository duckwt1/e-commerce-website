import categoryModel from "./CategoryModel";

class ProductModel {
    productId: number;
    name: string;
    description: string;
    avgRating: number;
    listPrice: number;
    sellPrice: number;
    quantity: number;
    soldQuantity: number;
    thumbnail: string;
    relatedImg: string[];
    categoryList: categoryModel[];
    idCategory?: number[];
    discountPercent : number;
    isFavorited?: boolean;

    constructor(
        productId: number,
        name: string,
        description: string,
        avgRating: number,
        listPrice: number,
        sellPrice: number,
        quantity: number,
        soldQuantity: number,
        thumbnail: string,
        relatedImg: string[],
        categoryList: categoryModel[],
        discountPercent: number,
        isFavorited?: boolean,

    ) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.avgRating = avgRating;
        this.listPrice = listPrice;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
        this.soldQuantity = soldQuantity;
        this.thumbnail = thumbnail;
        this.relatedImg = relatedImg;
        this.categoryList = categoryList;
        this.discountPercent = discountPercent;
        this.isFavorited = isFavorited;
    }
}

export default ProductModel;
