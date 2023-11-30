import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FaceService } from './face.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionDto } from './dto/session.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetFaceLivenessSessionResultsCommandOutput } from '@aws-sdk/client-rekognition';
import { SessionResultsDto } from './dto/session-results.dto';

@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('createSession')
  @ApiOperation({ summary: 'Create Face Liveness Session' })
  @ApiCreatedResponse({ type: SessionDto })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionDto> {
    const { requestToken } = createSessionDto;
    const sessionId =
      await this.faceService.createLivenessSession(requestToken);

    console.log({ sessionId });
    return { sessionId };
  }

  @Get(':sessionId')
  @ApiOperation({
    summary: 'Face Liveness 결과 얻어오기',
    description:
      '응답결과는 [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-rekognition/Interface/GetFaceLivenessSessionResultsCommandOutput/](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-rekognition/Interface/GetFaceLivenessSessionResultsCommandOutput/) 참고',
  })
  @ApiOkResponse({ type: SessionResultsDto })
  getResult(
    @Param('sessionId') sessionId: string,
  ): Promise<GetFaceLivenessSessionResultsCommandOutput> {
    console.log('sessionId', { sessionId });
    return this.faceService.getLivenessSessionResult(sessionId);
  }
}
