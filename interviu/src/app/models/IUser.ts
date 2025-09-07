export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
  createdAt: Date;
  createdBy: string;
  modifiedAt?: Date;
  modifiedBy?: string;
   password?: string;
}

  export interface LoginResponse {
    loggedUser: User;
    token: string;
  }
  