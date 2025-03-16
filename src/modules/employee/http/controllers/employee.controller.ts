import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeRequestDto } from '../../domain/dtos/request/createEmployee.request.dto';
import { EmployeeMapper } from '../../domain/mappers/createEmployee.mapper';
import { EmployeeService } from '../../domain/services/employee.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRoles } from 'src/common/utils/enum';
import { AuthGuard } from '@nestjs/passport';
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'), RoleGuard) // Aplica AuthGuard primeiro
  @Role(UserRoles.OWNER) // Define que apenas OWNER (role = 0) pode acessar
  async create(@Body() createEmployeeRequestDto: CreateEmployeeRequestDto) {
    try {
      const user = await EmployeeMapper.toMapperCreateEmployee(createEmployeeRequestDto);
      const createdUser = await this.employeeService.createEmployee(user);
      const createEmployeeResponse = EmployeeMapper.toMapperResponse(createdUser);
      return createEmployeeResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
