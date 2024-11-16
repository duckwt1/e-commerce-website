class ProductModel {
    productId: number;
    name: string;
    description: string;
    avgRating: number;
    listPrice: number | null;
    sellPrice: number;
    quantity: number;
    soldQuantity: number;
    thumbnail: string;
    relatedImg: string[];

    constructor(
        productId: number,
        name: string,
        description: string,
        avgRating: number,
        listPrice: number | null,
        sellPrice: number,
        quantity: number,
        soldQuantity: number,
        thumbnail: string,
        relatedImg: string[]
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
    }
}

export default ProductModel;
