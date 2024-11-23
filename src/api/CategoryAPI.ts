import { endpointBE } from "../layouts/utils/Constant";
import CategoryModel from "../model/CategoryModel";
import { request } from "./Request";

interface resultInterface {
   categoryList: CategoryModel[];
   category: CategoryModel;
}

async function getCategory(endpoint: string): Promise<resultInterface> {
   // Gọi phương thức request()
   const response = await request(endpoint);


   const categoryList: any = response._embedded.categorys.map((categoryData: any) => ({
      ...categoryData,
   }))

   return { categoryList: categoryList, category: response.category };
}

export async function getAllcategorys(): Promise<resultInterface> {
   const endpoint = endpointBE + "/category?sort=idcategory";

   return getCategory(endpoint);
}

export async function get1Category(idcategory: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/category/${idcategory}`;
   const response = await request(endpoint);

   return { category: response, categoryList: response };
}

export async function getCategoryByIdProduct(idBook: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/books/${idBook}/listcategorys`;

   return getCategory(endpoint);
}
