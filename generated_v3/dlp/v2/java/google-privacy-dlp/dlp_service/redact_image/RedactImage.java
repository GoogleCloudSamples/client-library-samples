// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_redact_image]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.ByteContentItem;
import com.google.privacy.dlp.v2.ByteContentItem.BytesType;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.LocationName;
import com.google.privacy.dlp.v2.RedactImageRequest;
import com.google.privacy.dlp.v2.RedactImageRequest.ImageRedactionConfig;
import com.google.privacy.dlp.v2.RedactImageResponse;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;

public class RedactImage {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    redactImage(projectId, locationId);
  }

  public static void redactImage(String projectId, String locationId) throws IOException {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      // Decode a minimal valid 1x1 PNG image
      byte[] imageBytes =
          Base64.getDecoder()
              .decode(
                  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");

      ByteContentItem byteItem =
          ByteContentItem.newBuilder()
              .setType(BytesType.IMAGE_PNG)
              .setData(ByteString.copyFrom(imageBytes))
              .build();

      ImageRedactionConfig[] imageRedactionConfigs =
          new ImageRedactionConfig[] {
            ImageRedactionConfig.newBuilder()
                .setInfoType(InfoType.newBuilder().setName("EMAIL_ADDRESS").build())
                .build()
          };

      RedactImageRequest request =
          RedactImageRequest.newBuilder()
              .setParent(LocationName.of(projectId, locationId).toString())
              .setByteItem(byteItem)
              .addAllImageRedactionConfigs(Arrays.asList(imageRedactionConfigs))
              .build();

      RedactImageResponse response = client.redactImage(request);
      System.out.println("Redacted image size: " + response.getRedactedImage().size() + " bytes");
    }
  }
}
// [END dlp_v2_dlpservice_redact_image]
