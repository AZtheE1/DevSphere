import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({ example: '2 + 2' })
  @IsString()
  @IsNotEmpty()
  expression: string;

  @ApiProperty({ example: '4' })
  @IsString()
  @IsNotEmpty()
  result: string;
}
