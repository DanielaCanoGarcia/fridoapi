import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(correo: string, contraseña: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!coincide) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const payload = {
      sub: usuario.id_usuario,
      rol: usuario.rol,
      usuario: usuario.usuario,
    };

    const token = await this.jwt.signAsync(payload);

    return {
      mensaje: 'Login exitoso',
      access_token: token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        correo: usuario.correo,
        rol: usuario.rol,
        usuario: usuario.usuario,
      },
    };
  }
}
