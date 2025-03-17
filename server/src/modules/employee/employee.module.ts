import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { EmployeeController } from './http/controllers/employee.controller';
import { EmployeeService } from './domain/services/employee.service';
import { EMPLOYEE_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { EmployeeRepository } from './infra/repositories/employee.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [
    PrismaService,
    EmployeeService,
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: EmployeeRepository,
    },
  ],
})
export class EmployeeModule {}
