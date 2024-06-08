import { ICreateUserRequest } from "../controller/ICreateUserRequest";
import { ILoginUserRequest } from "../controller/ILoginUserRequest";
import { UserRepository } from "../repository/UserRepository";
import { Service, Inject, Container } from "typedi";

@Service()
export class UserService {
  @Inject()
  private userRepository: UserRepository;
  async useListAllUserData() {
    const userData = this.userRepository.listAllUserData();
    return userData;
  }

  async useCreateUser(data: ICreateUserRequest) {
    const useCreateUser = this.userRepository.createUserData(data);
    return useCreateUser;
  }

  async useLoginUser(data: ILoginUserRequest) {
    const useLoginUser = this.userRepository.loginUser(data);
    return useLoginUser;
  }

  async useLogoutUser(refreshToken: string) {
    const useLogoutUser = this.userRepository.logoutUser(refreshToken);
    return useLogoutUser;
  }

  async useRefreshTokenUser(refreshToken: string) {
    const useRefreshToken = this.userRepository.refreshTokenUser(refreshToken);
    return useRefreshToken;
  }
}
