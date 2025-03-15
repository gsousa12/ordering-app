import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateEmployeeRequestDto } from '../../domain/dtos/request/createEmployee.request.dto';
import { EmployeeMapper } from '../../domain/mappers/createEmployee.mapper';
import { EmployeeService } from '../../domain/services/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
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
