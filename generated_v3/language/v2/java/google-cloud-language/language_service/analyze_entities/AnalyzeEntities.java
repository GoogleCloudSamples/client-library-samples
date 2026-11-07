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

// [START language_v2_languageservice_analyze_entities]
import com.google.cloud.language.v2.AnalyzeEntitiesRequest;
import com.google.cloud.language.v2.AnalyzeEntitiesResponse;
import com.google.cloud.language.v2.Document;
import com.google.cloud.language.v2.EncodingType;
import com.google.cloud.language.v2.Entity;
import com.google.cloud.language.v2.EntityMention;
import com.google.cloud.language.v2.LanguageServiceClient;
import java.io.IOException;

public class AnalyzeEntities {

  public static void main(String[] args) throws IOException {
    analyzeEntities();
  }

  public static void analyzeEntities() throws IOException {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent(
                  "Google, headquartered in Mountain View, was founded by Larry Page and Sergey"
                      + " Brin.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();
      EncodingType encodingType = EncodingType.UTF8;

      AnalyzeEntitiesRequest request =
          AnalyzeEntitiesRequest.newBuilder()
              .setDocument(document)
              .setEncodingType(encodingType)
              .build();

      AnalyzeEntitiesResponse response = client.analyzeEntities(request);

      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity: %s%n", entity.getName());
        System.out.printf("Type: %s%n", entity.getType());
        for (EntityMention mention : entity.getMentionsList()) {
          System.out.printf("Mention: %s%n", mention.getText().getContent());
          System.out.printf("Mention type: %s%n", mention.getType());
          System.out.printf("Begin offset: %d%n", mention.getText().getBeginOffset());
        }
      }
    }
  }
}
// [END language_v2_languageservice_analyze_entities]
