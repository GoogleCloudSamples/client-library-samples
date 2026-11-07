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

// [START dataplex_v1_businessglossaryservice_glossarycategory_get]
import com.google.cloud.dataplex.v1.BusinessGlossaryServiceClient;
import com.google.cloud.dataplex.v1.GlossaryCategory;

public class GetGlossaryCategory {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String glossaryId = "example-glossary_id";
    String categoryId = "example-category_id";
    String projectId = "example-project_id";
    getGlossaryCategory(locationId, glossaryId, categoryId, projectId);
  }

  public static void getGlossaryCategory(
      String locationId, String glossaryId, String categoryId, String projectId) throws Exception {
    try (BusinessGlossaryServiceClient client = BusinessGlossaryServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/glossaries/%s/categories/%s",
              projectId, locationId, glossaryId, categoryId);

      GlossaryCategory category = client.getGlossaryCategory(name);
      System.out.println("Category name: " + category.getName());
      System.out.println("Display name: " + category.getDisplayName());
    }
  }
}
// [END dataplex_v1_businessglossaryservice_glossarycategory_get]
