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

// [START translate_v3_translationservice_glossaries_list]
import com.google.cloud.translate.v3.Glossary;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslationServiceClient;

public class ListGlossaries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listGlossaries(projectId, locationId);
  }

  public static void listGlossaries(String projectId, String locationId) throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (Glossary glossary : client.listGlossaries(parent).iterateAll()) {
        System.out.printf("Glossary name: %s%n", glossary.getName());
        System.out.printf("Entry count: %d%n", glossary.getEntryCount());
      }
    }
  }
}
// [END translate_v3_translationservice_glossaries_list]
