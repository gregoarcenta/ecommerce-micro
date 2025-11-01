import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User, UserRole } from 'generated/prisma';
import { PrismaService } from '../common/services/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const { email, password, name } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async findAll(): Promise<
    Prisma.UserGetPayload<{ omit: { password: true; email: true } }>[]
  > {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });
  }

  async updateRole(userId: string, role: UserRole): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }
}
