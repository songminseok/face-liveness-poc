import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FaceService } from './face.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('createSession')
  async createSession(@Body() createSessionDto: CreateSessionDto) {
    const { requestToken } = createSessionDto;
    const sessionId =
      await this.faceService.createLivenessSession(requestToken);

    console.log({ sessionId });
    return { sessionId };
  }

  @Get(':sessionId')
  getResult(@Param('sessionId') sessionId: string) {
    console.log('sessionId', { sessionId });
    return this.faceService.getLivenessSessionResult(sessionId);
  }
}
