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

// [START language_v1beta2_languageservice_analyze_syntax]
import com.google.cloud.language.v1beta2.AnalyzeSyntaxRequest;
import com.google.cloud.language.v1beta2.AnalyzeSyntaxResponse;
import com.google.cloud.language.v1beta2.Document;
import com.google.cloud.language.v1beta2.EncodingType;
import com.google.cloud.language.v1beta2.LanguageServiceClient;
import com.google.cloud.language.v1beta2.Token;

public class AnalyzeSyntax {

  public static void main(String[] args) throws Exception {
    analyzeSyntax();
  }

  public static void analyzeSyntax() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent("Google Cloud Natural Language API provides text analysis.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      AnalyzeSyntaxRequest request =
          AnalyzeSyntaxRequest.newBuilder()
              .setDocument(document)
              .setEncodingType(EncodingType.UTF8)
              .build();

      AnalyzeSyntaxResponse response = client.analyzeSyntax(request);
      for (Token token : response.getTokensList()) {
        System.out.printf("Token text: %s%n", token.getText().getContent());
        System.out.printf("Part of speech: %s%n", token.getPartOfSpeech().getTag());
        System.out.printf("Lemma: %s%n", token.getLemma());
      }
    }
  }
}
// [END language_v1beta2_languageservice_analyze_syntax]
