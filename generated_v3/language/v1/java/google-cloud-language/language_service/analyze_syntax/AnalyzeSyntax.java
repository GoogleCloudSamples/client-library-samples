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

// [START language_v1_languageservice_analyze_syntax]
import com.google.cloud.language.v1.AnalyzeSyntaxResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Token;
import java.io.IOException;

public class AnalyzeSyntax {

  public static void main(String[] args) throws Exception {
    analyzeSyntax();
  }

  public static void analyzeSyntax() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent(
                  "Google, headquartered in Mountain View, unveiled the new Android phone at the"
                      + " Consumer Electronic Show.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();
      EncodingType encodingType = EncodingType.UTF8;

      AnalyzeSyntaxResponse response = client.analyzeSyntax(document, encodingType);

      for (Token token : response.getTokensList()) {
        System.out.printf("Text: %s%n", token.getText().getContent());
        System.out.printf("Part of speech: %s%n", token.getPartOfSpeech().getTag());
        System.out.printf("Dependency edge: %s%n", token.getDependencyEdge().getLabel());
        System.out.printf("Head token index: %d%n", token.getDependencyEdge().getHeadTokenIndex());
      }
    }
  }
}
// [END language_v1_languageservice_analyze_syntax]
