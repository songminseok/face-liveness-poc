import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({
    description: 'FaceLiveness Session Id',
    example: '5ef3c864-12f3-4ceb-a3bf-74b67b6f8c6b',
  })
  sessionId: string;
}
