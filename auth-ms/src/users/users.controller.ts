import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @MessagePattern('createUser')
  // create(@Payload() signUpDto: any) {
  //   return this.usersService.create(signUpDto);
  // }
}
