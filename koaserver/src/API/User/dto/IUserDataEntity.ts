export interface IUserDataEntity {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
  created_at: Date;
  updated_at: Date;
}
