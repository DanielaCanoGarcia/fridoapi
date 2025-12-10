import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {

    const hashed = await bcrypt.hash(data.contraseña, 10);
    return this.prisma.usuario.create({ 
      data:{
      nombre: data.nombre,
      apellido_pat: data.apellido_pat,
      correo: data.correo,
      rol: data.rol,
      usuario: data.usuario,
      contraseña: hashed, 
     },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id_usuario: id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id_usuario: id },
    });
  }
}
