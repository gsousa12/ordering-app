// src/common/guards/role.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IJwtPayload } from '../utils/interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtém a role necessária da metadata (definida no decorator)
    const requiredRole = this.reflector.get<number>('role', context.getHandler());

    // Se não houver role definida, permite o acesso
    if (!requiredRole) {
      return true;
    }

    // Obtém o payload do JWT do usuário autenticado
    const request = context.switchToHttp().getRequest();
    const user = request.user as IJwtPayload;

    // Verifica se o usuário tem a role necessária
    if (user.role !== requiredRole) {
      throw new ForbiddenException('Acesso negado: permissão insuficiente');
    }

    return true;
  }
}
