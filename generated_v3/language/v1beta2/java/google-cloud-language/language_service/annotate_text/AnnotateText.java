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

// [START language_v1beta2_languageservice_annotate_text]
import com.google.cloud.language.v1beta2.AnnotateTextRequest;
import com.google.cloud.language.v1beta2.AnnotateTextResponse;
import com.google.cloud.language.v1beta2.Document;
import com.google.cloud.language.v1beta2.EncodingType;
import com.google.cloud.language.v1beta2.Entity;
import com.google.cloud.language.v1beta2.LanguageServiceClient;
import com.google.cloud.language.v1beta2.Sentence;
import java.io.IOException;

public class AnnotateText {

  public static void main(String[] args) throws Exception {
    annotateText();
  }

  public static void annotateText() throws IOException {
    // Initialize client that will be automatically closed at the end of the block.
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      AnnotateTextRequest.Features features =
          AnnotateTextRequest.Features.newBuilder()
              .setExtractSyntax(true)
              .setExtractEntities(true)
              .setExtractDocumentSentiment(true)
              .build();

      Document document =
          Document.newBuilder()
              .setContent(
                  "Google, headquartered in Mountain View, unveiled the new Android phone. "
                      + "Sundar Pichai expressed enthusiasm for the release.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      EncodingType encodingType = EncodingType.UTF8;

      AnnotateTextResponse response = client.annotateText(document, features, encodingType);

      System.out.printf("Language: %s%n", response.getLanguage());
      System.out.printf(
          "Document sentiment score: %.2f, magnitude: %.2f%n",
          response.getDocumentSentiment().getScore(),
          response.getDocumentSentiment().getMagnitude());

      System.out.println("Sentences:");
      for (Sentence sentence : response.getSentencesList()) {
        System.out.printf(" - %s%n", sentence.getText().getContent());
      }

      System.out.println("Entities:");
      for (Entity entity : response.getEntitiesList()) {
        System.out.printf(" - %s (%s)%n", entity.getName(), entity.getType());
      }
    }
  }
}
// [END language_v1beta2_languageservice_annotate_text]
