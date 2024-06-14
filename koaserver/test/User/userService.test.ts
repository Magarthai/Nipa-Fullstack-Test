import "reflect-metadata";
import chai, { assert, expect } from "chai";
import Container from "typedi";
import {
  MockUserRepository,
  UserRepository,
} from "@app/API/User/repository/UserRepository";
import { UserService } from "@app/API/User/view/UserService";
import MockDatabase from "@app/db/MockDatabase";
import { ICreateUserRespone } from "@app/API/User/dto/ICreateUserRespone";
import { UserStatus } from "@app/API/User/enum/UserStatus";
import { IFindByID } from "@app/API/User/dto/IFindByID";
import chariAsPromised from "chai-as-promised";
import { TokenNotFoundError } from "@app/error/TokenNotFound";
import { TokenExpired } from "@app/error/TokenExpired";
export const UserServiceTest = () => {
  describe("UserService", function () {
    before(() => {
      chai.should();
      chai.use(chariAsPromised);
    });
    afterEach(() => {
      MockDatabase.user = [];
    });
    Container.set(UserRepository, Container.get(MockUserRepository));
    const userServices = Container.get(UserService);
    describe("useListAllUserData", function () {
      it("should return user list of length 1", async function () {
        const mockUserData = MockDatabase.user;
        mockUserData.push({
          id: 2,
          fname: "test",
          lname: "test",
          email: "test2@gmail.com",
          password: "test",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });
        const userData = await userServices.useListAllUserData();

        userData.length.should.equal(1);
      });
    });
    describe("useCreateUser", function () {
      it("should return new user ObjectID equal email testregister@gmail.com", async function () {
        const mockUserData = MockDatabase.user;
        mockUserData.push({
          id: 2,
          fname: "test",
          lname: "test",
          email: "test2@gmail.com",
          password: "test",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });

        const userData = {
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password: "xd",
        };
        const createUser: ICreateUserRespone =
          (await userServices.useCreateUser(userData)) as ICreateUserRespone;
        createUser.email.should.equal("testregister@gmail.com");
      });
    });
    describe("useLoginUser", function () {
      it("should return message password matched", async function () {
        MockDatabase.user.push({
          id: 4,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });
        const userLoginData = {
          email: "testregister@gmail.com",
          password: "xd",
        };

        const LoginUser = await userServices.useLoginUser(userLoginData);
        LoginUser.message.should.equal(UserStatus.Password_matched);
      });
      it("should return message Invalid password", async function () {
        MockDatabase.user.push({
          id: 4,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });
        const userLoginData = {
          email: "testregister@gmail.com",
          password: "@xd",
        };

        const LoginUser = await userServices.useLoginUser(userLoginData);
        LoginUser.message.should.equal(UserStatus.Invalid_password);
      });

      it("should return message Not found data", async function () {
        MockDatabase.user.push({
          id: 4,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });
        const userLoginData = {
          email: "",
          password: "@xd",
        };

        const LoginUser = await userServices.useLoginUser(userLoginData);
        LoginUser.message.should.equal(UserStatus.USER_NOT_FOUND);
      });
    });

    describe("UseLogoutUser", async function () {
      const refreshToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTgyODY2fQ.MDrYEC_SfnH2IUBdmu3NLfwnmd1S1lmSwZC9SIqfcpA";

      const logout = await userServices.useLogoutUser(refreshToken);
      logout.should.equal(UserStatus.Success);
    });

    describe("useRefreshTokenUser", async function () {
      it("should return user id 1", async function () {
        MockDatabase.user.push({
          id: 2,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });

        const refreshToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MzU0NjQyLCJleHAiOjg2NDAwMDAxNzE4MjY4MjQwfQ.Ng5QtepZD_pYS-5I5tOw3dXN_4ly0PYQ91Db12d5krM";

        const refresh: IFindByID = (await userServices.useRefreshTokenUser(
          refreshToken
        )) as IFindByID;
        refresh.id.should.equal(1);
      });

      it("should return token expired", async function () {
        MockDatabase.user.push({
          id: 2,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "string",
          created_at: new Date(),
          updated_at: new Date(),
        });

        const refreshToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MTgzNzAxLCJleHAiOjE3MTgyNzAxMDF9.jFgm6vp4IHa34-Sa_xub2FeTNX1ujvS0Vydt3eK4p8U";

        await userServices
          .useRefreshTokenUser(refreshToken)
          .should.eventually.rejectedWith(TokenExpired);
      });

      it("should show status Token not found", async function () {
        MockDatabase.user.push({
          id: 2,
          fname: "test",
          lname: "test",
          email: "testregister@gmail.com",
          password:
            "$2b$10$G/bU9WD5Mk7d5LxN47lSPextu8ecY4cRqimrdHSVyF6w1BuhN9HXa",
          role: "admin",
          refreshToken: "",
          created_at: new Date(),
          updated_at: new Date(),
        });

        const refreshToken = "";

        await userServices
          .useRefreshTokenUser(refreshToken)
          .should.eventually.rejectedWith(TokenNotFoundError);
      });
    });
  });
};
