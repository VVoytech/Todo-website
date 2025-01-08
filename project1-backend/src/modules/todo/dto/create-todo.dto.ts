import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  done: boolean;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  deadline: Date;
}
