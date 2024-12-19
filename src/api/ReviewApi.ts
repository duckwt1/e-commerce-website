import { endpointBE } from "../layouts/utils/Constant";
import ReviewModel from "../model/ReviewModel";
import { request, requestAdmin } from "./Request";

async function getReview(endpoint: string): Promise<ReviewModel[]> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response._embedded.reviews.map((reviewData: any) => ({
      ...reviewData,
   }));
}

export async function getAllReview(idProduct: number): Promise<ReviewModel[]> {
   // Xác định endpoint
   const endpoint: string = endpointBE + `/product/${idProduct}/listReviews`;

   return getReview(endpoint);
}

export async function getTotalNumberOfReviews(): Promise<number> {
   const endpoint = endpointBE + "/reviews/search/countBy";
   try {
      const response = await requestAdmin(endpoint);
      if (response) {
         return response;
      }
   } catch (error) {
      throw new Error("Lỗi không gọi được endpoint lấy tổng review\n" + error);
   }
   return 0;
}

export const getReviewsByProductId = async (idProduct: number): Promise<ReviewModel[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               idReview: 1,
               content: "Great product! Highly recommend.",
               ratingPoint: 5,
               timestamp: "2024-11-30",
            },
            {
                idReview: 2,
                content: "Good product, fast delivery.",
                ratingPoint: 4,
                timestamp: "2024-11-29",
                },
                {
                idReview: 3,
                content: "Average product, expected better.",
                ratingPoint: 3,
                timestamp: "2024-11-28",
            },
            {
                idReview: 4,
                content: "Poor product, not worth the price.",
                ratingPoint: 2,
                timestamp: "2024-11-27",
            },
            {
                idReview: 5,
                content: "Terrible product, do not buy.",
                ratingPoint: 1,
                timestamp: "2024-11-26",
            },
         ]);
      }, 1000); // Giả lập thời gian chờ API
   });
};
