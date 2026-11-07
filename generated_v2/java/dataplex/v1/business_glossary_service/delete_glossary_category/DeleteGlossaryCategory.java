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

// [START dataplex_v1_businessglossaryservice_glossarycategory_delete]
import com.google.cloud.dataplex.v1.BusinessGlossaryServiceClient;
import com.google.cloud.dataplex.v1.GlossaryCategoryName;
import java.io.IOException;

public class DeleteGlossaryCategory {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String glossaryId = "example-glossary_id";
    String categoryId = "example-category_id";
    String projectId = "example-project_id";
    deleteGlossaryCategory(locationId, glossaryId, categoryId, projectId);
  }

  public static void deleteGlossaryCategory(
      String locationId, String glossaryId, String categoryId, String projectId)
      throws IOException {
    try (BusinessGlossaryServiceClient client = BusinessGlossaryServiceClient.create()) {
      String name =
          GlossaryCategoryName.of(projectId, locationId, glossaryId, categoryId).toString();
      client.deleteGlossaryCategory(name);
      System.out.println("Glossary category deleted successfully: " + name);
    }
  }
}
// [END dataplex_v1_businessglossaryservice_glossarycategory_delete]
