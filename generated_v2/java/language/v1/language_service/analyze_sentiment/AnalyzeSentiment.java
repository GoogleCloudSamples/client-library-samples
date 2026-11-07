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

// [START language_v1_languageservice_analyze_sentiment]
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;

public class AnalyzeSentiment {

  public static void main(String[] args) throws Exception {
    analyzeSentiment();
  }

  public static void analyzeSentiment() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent("Google Cloud Natural Language API provides powerful text analysis.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();
      EncodingType encodingType = EncodingType.UTF8;

      AnalyzeSentimentResponse response = client.analyzeSentiment(document, encodingType);
      Sentiment sentiment = response.getDocumentSentiment();

      System.out.printf("Document sentiment score: %.2f%n", sentiment.getScore());
      System.out.printf("Document sentiment magnitude: %.2f%n", sentiment.getMagnitude());
    }
  }
}
// [END language_v1_languageservice_analyze_sentiment]
