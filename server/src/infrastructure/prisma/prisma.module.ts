// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // 💡 Hace que el módulo sea global en toda la aplicación
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Esto comparte la ÚNICA instancia creada aquí
})
export class PrismaModule {}
