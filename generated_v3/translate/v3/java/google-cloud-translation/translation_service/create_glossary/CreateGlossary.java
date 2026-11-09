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

package com.google.cloud.translate.v3;

// [START translate_v3_translationservice_glossary_create]
import com.google.cloud.translate.v3.GcsSource;
import com.google.cloud.translate.v3.Glossary;
import com.google.cloud.translate.v3.GlossaryInputConfig;
import com.google.cloud.translate.v3.GlossaryName;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.util.concurrent.TimeUnit;

public class CreateGlossary {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String glossaryId = "example-glossary-id";
    createGlossary(projectId, locationId, glossaryId);
  }

  public static void createGlossary(String projectId, String locationId, String glossaryId)
      throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      Glossary.LanguageCodePair languagePair =
          Glossary.LanguageCodePair.newBuilder()
              .setSourceLanguageCode("en")
              .setTargetLanguageCode("ja")
              .build();

      GcsSource gcsSource =
          GcsSource.newBuilder()
              .setInputUri("gs://cloud-samples-data/translation/glossary.csv")
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

      // Wait for the long-running operation to complete.
      Glossary response = client.createGlossaryAsync(parent, glossary).get(300, TimeUnit.SECONDS);

      System.out.printf("Created glossary: %s%n", response.getName());
      System.out.printf("Entry count: %d%n", response.getEntryCount());
      System.out.printf("Input URI: %s%n", response.getInputConfig().getGcsSource().getInputUri());
    }
  }
}
// [END translate_v3_translationservice_glossary_create]
