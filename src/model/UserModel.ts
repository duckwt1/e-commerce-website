class UserModel {
   id?: any;
   idUser: number;
   birthDate: Date;
   address: string;
   email: string;
   firstname: string;
   lastname: string;
   gender: string;
   password?: string;
   phoneNumber: string;
   name: string;
   avatar: string;
   role?: number;

   constructor(idUser: number,
      dateOfBirth: Date,
      deliveryAddress: string,
      purchaseAddress: string,
      email: string,
      firstName: string,
      lastName: string,
      gender: string,
      password: string,
      phoneNumber: string,
      username: string, avatar: string) {
      this.idUser = idUser;
      this.birthDate = dateOfBirth;
      this.address = deliveryAddress;
      this.email = email;
      this.firstname = firstName;
      this.lastname = lastName;
      this.gender = gender;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.name = username;
      this.avatar = avatar;
   }
}

export default UserModel;
