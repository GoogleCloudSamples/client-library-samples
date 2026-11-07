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

// [START translate_v3_translationservice_supportedlanguages_get]
import com.google.cloud.translate.v3.GetSupportedLanguagesRequest;
import com.google.cloud.translate.v3.SupportedLanguage;
import com.google.cloud.translate.v3.SupportedLanguages;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class GetSupportedLanguages {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    getSupportedLanguages(projectId, locationId);
  }

  public static void getSupportedLanguages(String projectId, String locationId) throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      GetSupportedLanguagesRequest request =
          GetSupportedLanguagesRequest.newBuilder()
              .setParent(parent)
              .setDisplayLanguageCode("en")
              .build();

      SupportedLanguages response = client.getSupportedLanguages(request);

      for (SupportedLanguage language : response.getLanguagesList()) {
        System.out.printf("Language code: %s%n", language.getLanguageCode());
        System.out.printf("Display name: %s%n", language.getDisplayName());
        System.out.printf("Supports source: %s%n", language.getSupportSource());
        System.out.printf("Supports target: %s%n", language.getSupportTarget());
      }
    }
  }
}
// [END translate_v3_translationservice_supportedlanguages_get]
