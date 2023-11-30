import {
  AuditImage,
  GetFaceLivenessSessionResultsCommandOutput,
  LivenessSessionStatus,
} from '@aws-sdk/client-rekognition';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetadata } from '@smithy/types';


export class SessionResultsDto
  implements GetFaceLivenessSessionResultsCommandOutput
{
  @ApiProperty({ description: 'Session Id' })
  SessionId: string;
  @ApiProperty({
    description: 'Session Status.',
    examples: ['CREATED', 'EXPIRED', 'FAILED', 'IN_PROGRESS', 'SUCCEEDED'],
  })
  Status: LivenessSessionStatus;
  @ApiProperty({ description: 'Confidence, 0~100 사이의 값.' })
  Confidence?: number;
  @ApiProperty({ description: '참조 이미지', type: 'AuditImage' })
  ReferenceImage?: AuditImage;
  @ApiProperty({ description: '얼굴 이미지', type: 'AuditImage[]' })
  AuditImages?: AuditImage[];
  @ApiProperty({ description: '응답 메타데이터', type: 'ResponseMetadata' })
  $metadata: ResponseMetadata;
}
