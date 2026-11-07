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

// [START language_v1beta2_languageservice_classify_text]
import com.google.cloud.language.v1beta2.ClassificationCategory;
import com.google.cloud.language.v1beta2.ClassifyTextResponse;
import com.google.cloud.language.v1beta2.Document;
import com.google.cloud.language.v1beta2.LanguageServiceClient;

public class ClassifyText {

  public static void main(String[] args) throws Exception {
    classifyText();
  }

  public static void classifyText() throws Exception {
    try (LanguageServiceClient client = LanguageServiceClient.create()) {
      Document document =
          Document.newBuilder()
              .setContent(
                  "Android is a mobile operating system based on a modified version of the Linux"
                      + " kernel and other open source software, designed primarily for touchscreen"
                      + " mobile devices such as smartphones and tablets.")
              .setType(Document.Type.PLAIN_TEXT)
              .build();

      ClassifyTextResponse response = client.classifyText(document);

      for (ClassificationCategory category : response.getCategoriesList()) {
        System.out.printf("Category: %s%n", category.getName());
        System.out.printf("Confidence: %.2f%n", category.getConfidence());
      }
    }
  }
}
// [END language_v1beta2_languageservice_classify_text]
