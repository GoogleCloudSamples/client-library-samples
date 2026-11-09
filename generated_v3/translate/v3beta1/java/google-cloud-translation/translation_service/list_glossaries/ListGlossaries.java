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

// [START translate_v3beta1_translationservice_glossaries_list]
import com.google.cloud.translate.v3beta1.Glossary;
import com.google.cloud.translate.v3beta1.ListGlossariesRequest;
import com.google.cloud.translate.v3beta1.LocationName;
import com.google.cloud.translate.v3beta1.TranslationServiceClient;
import java.io.IOException;

public class ListGlossaries {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listGlossaries(projectId, locationId);
  }

  public static void listGlossaries(String projectId, String locationId) throws IOException {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListGlossariesRequest request =
          ListGlossariesRequest.newBuilder().setParent(parent).build();

      for (Glossary glossary : client.listGlossaries(request).iterateAll()) {
        System.out.println("Glossary: " + glossary.getName());
        System.out.println("Entry count: " + glossary.getEntryCount());
        System.out.println("Input URI: " + glossary.getInputConfig().getGcsSource().getInputUri());
      }
    }
  }
}
// [END translate_v3beta1_translationservice_glossaries_list]
