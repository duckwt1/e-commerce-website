import { endpointBE } from "../layouts/utils/Constant";
import UserModel from "../model/UserModel";
import { request, requestAdmin } from "./Request";
import { getRoleByIdUser } from "./RoleApi";

async function getUser(endpoint: string): Promise<UserModel> {
   // Gọi phương thức request()
   const response = await request(endpoint);

   return response;
}

export async function getAllUserRole(): Promise<UserModel[]> {
   const endpoint: string = endpointBE + `/roles`;
   const response = await requestAdmin(endpoint);

   const data = response._embedded.roles.map((roleData: any) => {
      // Duyệt qua mảng listUsers trong mỗi vai trò (role)
      const users = roleData._embedded.listUsers.map((userData: any) => {
         // Xử lý các trường dữ liệu trong userData tại đây
         const user: UserModel = {
            idUser: userData.idUser,
            avatar: userData.avatar,
            dateOfBirth: userData.dateOfBirth,
            deliveryAddress: userData.deliveryAddress,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            phoneNumber: userData.phoneNumber,
            username: userData.username,
            role: roleData.nameRole,
         };
         return user;
      });
      return users;
   });

   return data;
}

export async function getOneUser(idUser: any): Promise<UserModel> {
   const endpoint = endpointBE + `/users/${idUser}`;
   const responseUser = await request(endpoint);
   const responseRole = await getRoleByIdUser(idUser);

   const user: UserModel = {
      idUser: responseUser.idUser,
      avatar: responseUser.avatar,
      dateOfBirth: responseUser.dateOfBirth,
      deliveryAddress: responseUser.deliveryAddress,
      email: responseUser.email,
      firstName: responseUser.firstName,
      lastName: responseUser.lastName,
      gender: responseUser.gender,
      phoneNumber: responseUser.phoneNumber,
      username: responseUser.username,
      role: responseRole.idRole,
   };

   return user;
}

export async function getUserByIdReview(idReview: number): Promise<UserModel> {
   // Xác định endpoint
   const endpoint: string = endpointBE + `/reviews/${idReview}/user`;

   return getUser(endpoint);
}




export async function get1User(idUser: any): Promise<UserModel> {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('No token found');
   }

   const endpoint = `${endpointBE}/users/${idUser}`;
   const responseUser = await fetch(endpoint, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
   });

   if (!responseUser.ok) {
      const errorText = await responseUser.text();
      throw new Error(`Error: ${responseUser.status} ${responseUser.statusText} - ${errorText}`);
   }

   const userData = await responseUser.json();
   const responseRole = await getRoleByIdUser(idUser);

   const user: UserModel = {
      idUser: userData.idUser,
      avatar: userData.avatar,
      dateOfBirth: userData.dateOfBirth,
      deliveryAddress: userData.deliveryAddress,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      phoneNumber: userData.phoneNumber,
      username: userData.username,
      role: responseRole.idRole,
   };

   return user;
}
