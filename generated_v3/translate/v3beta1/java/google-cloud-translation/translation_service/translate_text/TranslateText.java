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

// [START translate_v3beta1_translationservice_translate_text]
import com.google.cloud.translate.v3beta1.LocationName;
import com.google.cloud.translate.v3beta1.TranslateTextRequest;
import com.google.cloud.translate.v3beta1.TranslateTextResponse;
import com.google.cloud.translate.v3beta1.Translation;
import com.google.cloud.translate.v3beta1.TranslationServiceClient;

public class TranslateText {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    translateText(projectId, locationId);
  }

  public static void translateText(String projectId, String locationId) throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String contents = "Hello, world!";
      String parent = LocationName.of(projectId, locationId).toString();
      String targetLanguageCode = "es";

      TranslateTextRequest request =
          TranslateTextRequest.newBuilder()
              .setParent(parent)
              .setTargetLanguageCode(targetLanguageCode)
              .addContents(contents)
              .build();

      TranslateTextResponse response = client.translateText(request);

      for (Translation translation : response.getTranslationsList()) {
        System.out.printf("Translated text: %s%n", translation.getTranslatedText());
      }
    }
  }
}
// [END translate_v3beta1_translationservice_translate_text]
