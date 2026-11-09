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

// [START translate_v3_translationservice_glossaryentry_get]
import com.google.cloud.translate.v3.GlossaryEntry;
import com.google.cloud.translate.v3.GlossaryEntryName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class GetGlossaryEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String glossaryId = "example-glossary-id";
    String glossaryEntryId = "example-glossary-entry-id";
    getGlossaryEntry(projectId, locationId, glossaryId, glossaryEntryId);
  }

  public static void getGlossaryEntry(
      String projectId, String locationId, String glossaryId, String glossaryEntryId)
      throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String name =
          GlossaryEntryName.of(projectId, locationId, glossaryId, glossaryEntryId).toString();

      GlossaryEntry response = client.getGlossaryEntry(name);

      System.out.println("Glossary entry name: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END translate_v3_translationservice_glossaryentry_get]
