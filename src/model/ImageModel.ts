class ImageModel {
   id: number;
   urlImage: string;
   name: string | null;
   isThumbnail: boolean | null;

   constructor(id: number, urlImage: string, name: string | null, isThumbnail: boolean | null) {
      this.id = id;
      this.urlImage = urlImage;
      this.name = name;
      this.isThumbnail = isThumbnail;
   }
}

export default ImageModel;
