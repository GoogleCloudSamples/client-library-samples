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

// [START translate_v3_translationservice_glossaryentries_list]
import com.google.cloud.translate.v3.GlossaryEntry;
import com.google.cloud.translate.v3.GlossaryName;
import com.google.cloud.translate.v3.ListGlossaryEntriesRequest;
import com.google.cloud.translate.v3.TranslationServiceClient;

public class ListGlossaryEntries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String glossaryId = "example-glossary-id";
    listGlossaryEntries(projectId, locationId, glossaryId);
  }

  public static void listGlossaryEntries(String projectId, String locationId, String glossaryId)
      throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = GlossaryName.of(projectId, locationId, glossaryId).toString();
      ListGlossaryEntriesRequest request =
          ListGlossaryEntriesRequest.newBuilder().setParent(parent).build();

      for (GlossaryEntry entry : client.listGlossaryEntries(request).iterateAll()) {
        System.out.printf("Glossary entry: %s%n", entry.getName());
        if (entry.hasTermsPair()) {
          System.out.printf(
              "Source text (%s): %s%n",
              entry.getTermsPair().getSourceTerm().getLanguageCode(),
              entry.getTermsPair().getSourceTerm().getText());
          System.out.printf(
              "Target text (%s): %s%n",
              entry.getTermsPair().getTargetTerm().getLanguageCode(),
              entry.getTermsPair().getTargetTerm().getText());
        }
      }
    }
  }
}
// [END translate_v3_translationservice_glossaryentries_list]
