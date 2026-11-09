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

package com.google.cloud.translate.v3beta1;

// [START translate_v3beta1_translationservice_glossary_create]
import com.google.cloud.translate.v3beta1.GcsSource;
import com.google.cloud.translate.v3beta1.Glossary;
import com.google.cloud.translate.v3beta1.GlossaryInputConfig;
import com.google.cloud.translate.v3beta1.GlossaryName;
import com.google.cloud.translate.v3beta1.LocationName;
import com.google.cloud.translate.v3beta1.TranslationServiceClient;

public class CreateGlossary {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Custom glossaries require a non-global regional location.
    String locationId = "us-central1";
    String glossaryId = "example-glossary-id";
    createGlossary(projectId, locationId, glossaryId);
  }

  public static void createGlossary(String projectId, String locationId, String glossaryId) throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      Glossary.LanguageCodePair languagePair =
          Glossary.LanguageCodePair.newBuilder()
              .setSourceLanguageCode("en")
              .setTargetLanguageCode("ja")
              .build();

      GcsSource gcsSource =
          GcsSource.newBuilder()
              .setInputUri("gs://cloud-samples-data/translation/glossary_ja.csv")
              .build();

      GlossaryInputConfig inputConfig =
          GlossaryInputConfig.newBuilder()
              .setGcsSource(gcsSource)
              .build();

      Glossary glossary =
          Glossary.newBuilder()
              .setName(GlossaryName.of(projectId, locationId, glossaryId).toString())
              .setLanguagePair(languagePair)
              .setInputConfig(inputConfig)
              .build();

      // Initiate the asynchronous creation operation and block until completion.
      Glossary response = client.createGlossaryAsync(parent, glossary).get();

      System.out.println("Created glossary: " + response.getName());
      System.out.println("Entry count: " + response.getEntryCount());
      System.out.println("Input URI: " + response.getInputConfig().getGcsSource().getInputUri());
    }
  }
}
// [END translate_v3beta1_translationservice_glossary_create]
