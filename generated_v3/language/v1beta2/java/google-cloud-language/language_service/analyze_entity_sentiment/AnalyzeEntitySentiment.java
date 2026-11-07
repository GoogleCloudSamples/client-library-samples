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

package com.google.cloud.language.v1beta2;

// [START language_v1beta2_languageservice_analyze_entity_sentiment]
import com.google.cloud.language.v1beta2.AnalyzeEntitySentimentRequest;
import com.google.cloud.language.v1beta2.AnalyzeEntitySentimentResponse;
import com.google.cloud.language.v1beta2.Document;
import com.google.cloud.language.v1beta2.Entity;
import com.google.cloud.language.v1beta2.LanguageServiceClient;
import com.google.cloud.language.v1beta2.LanguageServiceSettings;
import java.io.IOException;

public class AnalyzeEntitySentiment {

  public static void main(String[] args) throws IOException {
    analyzeEntitySentiment();
  }

  public static void analyzeEntitySentiment() throws IOException {
    LanguageServiceSettings.Builder settingsBuilder = LanguageServiceSettings.newBuilder();
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId == null || projectId.isEmpty()) {
      projectId = System.getenv("GCP_PROJECT");
    }
    if (projectId != null && !projectId.isEmpty()) {
      settingsBuilder.setQuotaProjectId(projectId);
    }

    try (LanguageServiceClient client = LanguageServiceClient.create(settingsBuilder.build())) {
      Document document =
          Document.newBuilder()
              .setContent("Google, headquartered in Mountain View, unveiled the new phone.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      AnalyzeEntitySentimentRequest request =
          AnalyzeEntitySentimentRequest.newBuilder()
              .setDocument(document)
              .build();

      AnalyzeEntitySentimentResponse response = client.analyzeEntitySentiment(request);
      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity: %s%n", entity.getName());
        System.out.printf("Salience: %.3f%n", entity.getSalience());
        System.out.printf("Sentiment Score: %.3f%n", entity.getSentiment().getScore());
        System.out.printf("Sentiment Magnitude: %.3f%n", entity.getSentiment().getMagnitude());
      }
    }
  }
}
// [END language_v1beta2_languageservice_analyze_entity_sentiment]
