import { endpointBE } from "../layouts/utils/Constant";
import CategoryModel from "../model/CategoryModel";
import { request } from "./Request";

interface resultInterface {
   categoryList: CategoryModel[];
   category: CategoryModel | null;
}

async function getCategory(endpoint: string): Promise<resultInterface> {
   const response = await request(endpoint);

   const categoryList: CategoryModel[] = response.map((categoryData: any) => {
      const idCategory = categoryData.id;
      const name = categoryData.name;
      const description = categoryData.description;
      const thumbnail = categoryData.thumbnail;

      return new CategoryModel(idCategory, name);
   });

   return { categoryList: categoryList, category: null };
}

export async function getAllcategorys(): Promise<resultInterface> {
   const endpoint = endpointBE + "/api/category/get-all";
   return getCategory(endpoint);
}

export async function get1Category(idcategory: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/category/${idcategory}`;
   const response = await request(endpoint);

   return { category: response, categoryList: response };
}

export async function getCategoryByIdProduct(idBook: number): Promise<resultInterface> {
   const endpoint = endpointBE + `/propduct/${idBook}/listcategorys`;
   return getCategory(endpoint);
}
