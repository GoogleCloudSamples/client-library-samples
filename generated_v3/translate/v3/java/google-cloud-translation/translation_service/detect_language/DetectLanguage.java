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

package com.google.cloud.translate.v3;

// [START translate_v3_translationservice_detect_language]
import com.google.cloud.translate.v3.DetectLanguageRequest;
import com.google.cloud.translate.v3.DetectLanguageResponse;
import com.google.cloud.translate.v3.DetectedLanguage;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class DetectLanguage {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String content = "example-content";
    detectLanguage(projectId, locationId, content);
  }

  public static void detectLanguage(String projectId, String locationId, String content)
      throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      DetectLanguageRequest request =
          DetectLanguageRequest.newBuilder()
              .setParent(parent)
              .setMimeType("text/plain")
              .setContent(content)
              .build();

      DetectLanguageResponse response = client.detectLanguage(request);

      for (DetectedLanguage responseLanguage : response.getLanguagesList()) {
        System.out.printf("Language code: %s%n", responseLanguage.getLanguageCode());
        System.out.printf("Confidence: %f%n", responseLanguage.getConfidence());
      }
    }
  }
}
// [END translate_v3_translationservice_detect_language]
