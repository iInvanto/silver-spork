// src/users/users.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperationSummary,
} from "../api/swagger.decorators";
import { CreateUserDto } from "./dto/create-user.dto";
import UpdateUserDto from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperationSummary("Create User")
  @ApiCreatedResponse(User)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperationSummary("Get all users")
  @ApiOkResponse(User, { isArray: true })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperationSummary("Get user details by id")
  @ApiOkResponse(User)
  @ApiNotFoundResponse()
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperationSummary("Update user details by id")
  @ApiOkResponse(User)
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperationSummary("Delete user by id")
  @ApiOkResponse("Successfully deleted user")
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
