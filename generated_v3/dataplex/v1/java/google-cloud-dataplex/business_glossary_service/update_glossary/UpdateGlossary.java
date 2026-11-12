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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_businessglossaryservice_glossary_update]
import com.google.cloud.dataplex.v1.BusinessGlossaryServiceClient;
import com.google.protobuf.FieldMask;

public class UpdateGlossary {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String glossaryId = "example-glossary_id";
    String projectId = "example-project_id";
    updateGlossary(locationId, glossaryId, projectId);
  }

  public static void updateGlossary(String locationId, String glossaryId, String projectId)
      throws Exception {
    try (BusinessGlossaryServiceClient client = BusinessGlossaryServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Glossary glossary =
          Glossary.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/glossaries/%s", projectId, locationId, glossaryId))
              .setDescription("Updated glossary description")
              .build();

      Glossary response = client.updateGlossaryAsync(glossary, updateMask).get();
      System.out.println("Updated glossary: " + response.getName());
    }
  }
}
// [END dataplex_v1_businessglossaryservice_glossary_update]
