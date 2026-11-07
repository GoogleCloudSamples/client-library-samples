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

package com.google.cloud.language.v1;

// [START language_v1_languageservice_analyze_entities]
import com.google.cloud.language.v1.AnalyzeEntitiesResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.Entity;
import com.google.cloud.language.v1.EntityMention;
import com.google.cloud.language.v1.LanguageServiceClient;

public class AnalyzeEntities {

  public static void main(String[] args) throws Exception {
    analyzeEntities();
  }

  public static void analyzeEntities() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent(
                  "Google, headquartered in Mountain View, was founded by Larry Page and Sergey"
                      + " Brin.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();
      EncodingType encodingType = EncodingType.UTF8;

      AnalyzeEntitiesResponse response = client.analyzeEntities(document, encodingType);

      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity: %s%n", entity.getName());
        System.out.printf("Salience: %.3f%n", entity.getSalience());
        System.out.printf("Type: %s%n", entity.getType());
        for (EntityMention mention : entity.getMentionsList()) {
          System.out.printf(
              "Mention: %s (Offset: %d)%n",
              mention.getText().getContent(), mention.getText().getBeginOffset());
        }
      }
    }
  }
}
// [END language_v1_languageservice_analyze_entities]
