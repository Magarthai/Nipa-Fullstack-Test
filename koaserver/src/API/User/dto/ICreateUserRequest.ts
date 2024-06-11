export interface ICreateUserRequest {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  id: number;
  created_at: Date;
  updated_at: Date;
}