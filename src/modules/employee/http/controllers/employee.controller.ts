import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeRequestDto } from '../../domain/dtos/request/create-employee.request.dto';
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
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(UserRoles.OWNER)
  async create(@Body() createEmployeeRequestDto: CreateEmployeeRequestDto, @Request() req) {
    const userId: number = req.user.sub;
    const permissionLevel = createEmployeeRequestDto.permissionLevel;
    const restaurantId = createEmployeeRequestDto.restaurantId;

    try {
      const employee = await EmployeeMapper.toMapperCreateEmployee(createEmployeeRequestDto);

      const createdEmployee = await this.employeeService.createEmployee(
        employee,
        userId,
        restaurantId,
        permissionLevel,
      );

      const createEmployeeResponse = EmployeeMapper.toMapperResponse(createdEmployee);

      return createEmployeeResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
