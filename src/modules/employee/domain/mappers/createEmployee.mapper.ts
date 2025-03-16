import { User } from 'src/modules/user/domain/entities/user.entity';
import { CreateEmployeeRequestDto } from '../dtos/request/create-employee.request.dto';
import { CreateEmployeeResponseDto } from '../dtos/response/create-employee.response.dto';

export class EmployeeMapper {
  static async toMapperCreateEmployee(createEmployeeRequestDto: CreateEmployeeRequestDto): Promise<User> {
    const user = new User();
    user.name = createEmployeeRequestDto.name;
    user.email = createEmployeeRequestDto.email;
    user.password = createEmployeeRequestDto.password;
    return user;
  }

  static async toMapperResponse(createdEmployee: User): Promise<CreateEmployeeResponseDto> {
    const createEmployeeResponseDto = new CreateEmployeeResponseDto();
    createEmployeeResponseDto.name = createdEmployee.name;
    createEmployeeResponseDto.email = createdEmployee.email;
    createEmployeeResponseDto.createdAt = createdEmployee.createdAt || new Date();
    return createEmployeeResponseDto;
  }
}
