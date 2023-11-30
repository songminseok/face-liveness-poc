import { Injectable } from '@nestjs/common';
import {
  RekognitionClient,
  CreateFaceLivenessSessionCommand,
  GetFaceLivenessSessionResultsCommand,
} from '@aws-sdk/client-rekognition';

@Injectable()
export class FaceService {
  client = new RekognitionClient();

  async createLivenessSession(requestToken: string) {
    console.log('createLivenessSession', { requestToken });

    const input = {
      // KmsKeyId: 'STRING_VALUE', Optional
      Settings: {
        // CreateFaceLivenessSessionRequestSettings
        OutputConfig: {
          // LivenessOutputConfig
          S3Bucket: 'face-liveness-poc', // required
          S3KeyPrefix: 'poc-',
        },
      },
      ClientRequestToken: requestToken,
    };

    const command = new CreateFaceLivenessSessionCommand(input);
    const response = await this.client.send(command);

    return response.SessionId;
  }

  async getLivenessSessionResult(SessionId: string) {
    const input = {
      SessionId,
    };

    const command = new GetFaceLivenessSessionResultsCommand(input);
    const response = await this.client.send(command);

    return response;
    // { // GetFaceLivenessSessionResultsResponse
    //   SessionId: "STRING_VALUE", // required
    //   Status: "CREATED" || "IN_PROGRESS" || "SUCCEEDED" || "FAILED" || "EXPIRED", // required
    //   Confidence: Number("float"),
    //   ReferenceImage: { // AuditImage
    //     Bytes: "BLOB_VALUE",
    //     S3Object: { // S3Object
    //       Bucket: "STRING_VALUE",
    //       Name: "STRING_VALUE",
    //       Version: "STRING_VALUE",
    //     },
    //     BoundingBox: { // BoundingBox
    //       Width: Number("float"),
    //       Height: Number("float"),
    //       Left: Number("float"),
    //       Top: Number("float"),
    //     },
    //   },
    //   AuditImages: [ // AuditImages
    //     {
    //       Bytes: "BLOB_VALUE",
    //       S3Object: {
    //         Bucket: "STRING_VALUE",
    //         Name: "STRING_VALUE",
    //         Version: "STRING_VALUE",
    //       },
    //       BoundingBox: {
    //         Width: Number("float"),
    //         Height: Number("float"),
    //         Left: Number("float"),
    //         Top: Number("float"),
    //       },
    //     },
    //   ],
    // };
  }
}
