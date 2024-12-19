import { endpointBE } from "../layouts/utils/Constant";
import { getIdUserByToken } from "../layouts/utils/JwtService";
import { request } from "./Request";
import CartItemModel from "../model/CartItemModel";
import ProductModel from "../model/ProductModel";

// Function to fetch products from a user's cart
export async function getCartAllByIdUser(): Promise<CartItemModel[]> {
   const idUser = getIdUserByToken();
   const endpoint = `${endpointBE}/api/cart/findByUserId?userId=${idUser}`;
   console.log("Fetching cart products. Endpoint: ", endpoint);

   try {
      const cartResponse = await request(endpoint);
      console.log("Cart response: ", cartResponse);

      if (cartResponse && Array.isArray(cartResponse)) {
         // Map the response to CartItemModel instances
         const cartItems = cartResponse.map((item: any) => {
            const product = new ProductModel(
                item.product.id,
                item.product.name,
                item.product.description,
                item.product.avgRating,
                item.product.listPrice,
                item.product.sellPrice,
                item.product.quantity,
                item.product.soldQuantity,
                item.product.thumbnail,
                item.product.relatedImg,
                item.product.categoryList,
                item.product.discountPercent
            );
            return new CartItemModel(item.quantity, product);
         });
         return cartItems;
      } else {
         console.warn("No cart items found or invalid response format.");
         return [];
      }
   } catch (error) {
      console.error("Error fetching cart products: ", error);
      return [];
   }
}
