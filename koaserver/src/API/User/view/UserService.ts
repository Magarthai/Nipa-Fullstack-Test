import { Inject, Service } from "typedi";
import { UserRepository } from "../repository/UserRepository";
import { ICreateUserRequest } from "../repository/ICreateUserRequest";
import { ILoginUserRequest } from "../repository/ILoginUserRequest";

@Service()
export class UserService {
  constructor(
    @Inject(() => UserRepository)
    private userRepository: UserRepository
  ) {}

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
