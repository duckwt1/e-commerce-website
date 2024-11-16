import { endpointBE } from "../layouts/utils/Constant";
import ImageModel from "../model/ImageModel";
import { request } from "./Request";

async function getProductImage(endpoint: string): Promise<ImageModel[]> {
    const response = await request(endpoint);

    if (!response || !Array.isArray(response)) {
        throw new Error("Response does not contain a valid array of images");
    }

    return response.map((image: any) => {
        return new ImageModel(
            image.id,
            image.urlImage,
            image.name,
            image.isThumbnail
        );
    });
}

export async function getAllImageByProduct(productId: number): Promise<ImageModel[]> {
    const endpoint: string = `${endpointBE}/api/product/${productId}/images`;
    return getProductImage(endpoint);
}
