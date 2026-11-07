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

package com.google.cloud.translate.v3beta1;

// [START translate_v3beta1_translationservice_supportedlanguages_get]
import com.google.cloud.translate.v3beta1.GetSupportedLanguagesRequest;
import com.google.cloud.translate.v3beta1.LocationName;
import com.google.cloud.translate.v3beta1.SupportedLanguage;
import com.google.cloud.translate.v3beta1.SupportedLanguages;
import com.google.cloud.translate.v3beta1.TranslationServiceClient;
import java.io.IOException;

public class GetSupportedLanguages {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }
    getSupportedLanguages(projectId, locationId);
  }

  public static void getSupportedLanguages(String projectId, String locationId) throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      GetSupportedLanguagesRequest request =
          GetSupportedLanguagesRequest.newBuilder()
              .setParent(parent)
              .setDisplayLanguageCode("en")
              .build();

      SupportedLanguages response = client.getSupportedLanguages(request);

      for (SupportedLanguage language : response.getLanguagesList()) {
        System.out.printf("Language Code: %s%n", language.getLanguageCode());
        System.out.printf("Display Name: %s%n", language.getDisplayName());
        System.out.printf("Support Source: %b%n", language.getSupportSource());
        System.out.printf("Support Target: %b%n", language.getSupportTarget());
      }
    }
  }
}
// [END translate_v3beta1_translationservice_supportedlanguages_get]
