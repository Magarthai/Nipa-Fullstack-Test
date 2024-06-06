import { ICreateUserRequest } from "../controller/ICreateUserRequest";
import { ILoginUserRequest } from "../controller/ILoginUserRequest";
import { UserRepository } from "../repository/UserRepository";
const userRepository = new UserRepository();
export class UserService {
  async useGetAllUserData() {
    const userData = userRepository.getAllUserData();
    return userData;
  }

  async useCreateUser(data: ICreateUserRequest) {
    const useCreateUser = userRepository.createUserData(data);
    return useCreateUser;
  }

  async useLoginUser(data: ILoginUserRequest) {
    const useLoginUser = userRepository.loginUser(data);
    return useLoginUser;
  }

  async useLogoutUser(refreshToken: string) {
    const useLogoutUser = userRepository.logoutUser(refreshToken);
    return useLogoutUser;
  }

  async useRefreshTokenUser(refreshToken: string) {
    const useRefreshToken = userRepository.refreshTokenUser(refreshToken);
    return useRefreshToken;
  }
}
