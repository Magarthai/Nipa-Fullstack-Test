// import {Controller, Param, Body, Get, Post, Put, Delete, JsonController} from "routing-controllers";
// const allUserData = require("../Api/User/alluser");
// const User = require("../../models/User.model");

// export class Users {
//    firstname: string | undefined;
//    lastname: string | undefined;
// }

// @JsonController()
// export class UserController {

//     @Get("/users")
//     async  getAll() {
//       try {
//       const data =  await User.find();
//       console.log(data)
//       return data
//       } catch(err) {
//          return(err)
//       }
//     }

//     @Get("/users/:id")
//     getOne(@Param("id") id: number) {
//        return "This action returns user #" + id;
//     }

//     @Post("/users")
//     post(@Body() message: Users) {
//          console.log('saving user ' + JSON.stringify(message.firstname));
//        return `Saving user... ${JSON.stringify(message.firstname)}`;
//     }

//     @Put("/users/:id")
//     put(@Param("id") id: number, @Body() user: any) {
//        return "Updating a user...";
//     }

//     @Delete("/users/:id")
//     remove(@Param("id") id: number) {
//        return "Removing user...";
//     }

// }