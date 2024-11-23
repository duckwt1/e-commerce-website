class CategoryModel {
   id?: number;
   idCategory: number;
   name: string;

   constructor(idCategory: number, name: string) {
      this.idCategory = idCategory;
      this.name = name;
   }
}

export default CategoryModel;
