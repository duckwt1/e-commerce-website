import ProductModel from "./ProductModel";

class CartItemModel {
   idCart?: any;
   quantity: number;
   book: ProductModel;
   idUser?: number;
   review?: boolean;

   constructor(quantity: number, book: ProductModel) {
      this.quantity = quantity;
      this.book = book;
   }
}

export default CartItemModel;
