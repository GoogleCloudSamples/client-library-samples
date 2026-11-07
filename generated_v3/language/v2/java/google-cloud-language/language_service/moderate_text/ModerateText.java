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

package com.google.cloud.language.v2;

// [START language_v2_languageservice_moderate_text]
import com.google.cloud.language.v2.ClassificationCategory;
import com.google.cloud.language.v2.Document;
import com.google.cloud.language.v2.LanguageServiceClient;
import com.google.cloud.language.v2.LanguageServiceSettings;
import com.google.cloud.language.v2.ModerateTextResponse;
import java.io.IOException;

public class ModerateText {

  public static void main(String[] args) throws IOException {
    moderateText();
  }

  public static void moderateText() throws IOException {
    LanguageServiceSettings.Builder settingsBuilder = LanguageServiceSettings.newBuilder();
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("PROJECT_ID");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    // Initialize client that will be used to send requests.
    try (LanguageServiceClient client = LanguageServiceClient.create(settingsBuilder.build())) {
      Document document =
          Document.newBuilder()
              .setContent("The quick brown fox jumps over the lazy dog.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      ModerateTextResponse response = client.moderateText(document);

      for (ClassificationCategory category : response.getModerationCategoriesList()) {
        System.out.printf(
            "Category: %s, Confidence: %.2f%n", category.getName(), category.getConfidence());
      }
    }
  }
}
// [END language_v2_languageservice_moderate_text]
