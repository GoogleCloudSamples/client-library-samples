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

// [START language_v2_languageservice_annotate_text]
import com.google.cloud.language.v2.AnnotateTextRequest;
import com.google.cloud.language.v2.AnnotateTextResponse;
import com.google.cloud.language.v2.Document;
import com.google.cloud.language.v2.Entity;
import com.google.cloud.language.v2.LanguageServiceClient;
import java.io.IOException;

public class AnnotateText {

  public static void main(String[] args) throws Exception {
    annotateText();
  }

  public static void annotateText() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent(
                  "Google Cloud Natural Language API provides powerful entity analysis and"
                      + " sentiment analysis.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      AnnotateTextRequest.Features features =
          AnnotateTextRequest.Features.newBuilder()
              .setExtractEntities(true)
              .setExtractDocumentSentiment(true)
              .build();

      AnnotateTextRequest request =
          AnnotateTextRequest.newBuilder()
              .setDocument(document)
              .setFeatures(features)
              .build();

      AnnotateTextResponse response = client.annotateText(request);

      System.out.printf(
          "Document sentiment score: %.2f%n", response.getDocumentSentiment().getScore());
      System.out.printf(
          "Document sentiment magnitude: %.2f%n", response.getDocumentSentiment().getMagnitude());
      for (Entity entity : response.getEntitiesList()) {
        System.out.printf("Entity: %s, Type: %s%n", entity.getName(), entity.getType());
      }
    }
  }
}
// [END language_v2_languageservice_annotate_text]
