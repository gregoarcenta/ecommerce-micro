import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from './roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    Roles(roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
};
