import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({
    description:
      '동일 세션 생성 방지를 위한 토큰값으로 임의의 문자열을 생성해서 사용합니다.',
    example: '1',
  })
  requestToken: string;
}
