export interface UserInformation {
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}
