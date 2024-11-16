import ProductModel from "./ProductModel";

class CartItemModel {
   idCart?: any;
   quantity: number;
   product: ProductModel;
   idUser?: number;
   review?: boolean;

   constructor(quantity: number, product: ProductModel) {
      this.quantity = quantity;
      this.product = product;
   }
}

export default CartItemModel;
