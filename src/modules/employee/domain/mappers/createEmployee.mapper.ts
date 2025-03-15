import { User } from 'src/modules/user/domain/entities/user.entity';
import { CreateEmployeeRequestDto } from '../dtos/request/createEmployee.request.dto';
import { CreateEmployeeResponseDto } from '../dtos/response/createEmployee.response.dto';

export class EmployeeMapper {
  static async toMapperCreateEmployee(createEmployeeRequestDto: CreateEmployeeRequestDto): Promise<User> {
    const user = new User();
    user.name = createEmployeeRequestDto.name;
    user.email = createEmployeeRequestDto.email;
    user.password = createEmployeeRequestDto.password;
    return user;
  }

  static async toMapperResponse(user: User): Promise<CreateEmployeeResponseDto> {
    const createEmployeeResponseDto = new CreateEmployeeResponseDto();
    createEmployeeResponseDto.name = user.name;
    createEmployeeResponseDto.email = user.email;
    createEmployeeResponseDto.createdAt = user.createdAt || new Date();
    return createEmployeeResponseDto;
  }
}
