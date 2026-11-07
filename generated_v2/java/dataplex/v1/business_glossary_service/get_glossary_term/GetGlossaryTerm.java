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

// [START dataplex_v1_businessglossaryservice_glossaryterm_get]
import com.google.cloud.dataplex.v1.BusinessGlossaryServiceClient;
import com.google.cloud.dataplex.v1.GetGlossaryTermRequest;
import com.google.cloud.dataplex.v1.GlossaryTerm;

public class GetGlossaryTerm {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String glossaryId = "example-glossary_id";
    String termId = "example-term_id";
    String projectId = "example-project_id";
    getGlossaryTerm(locationId, glossaryId, termId, projectId);
  }

  public static void getGlossaryTerm(
      String locationId, String glossaryId, String termId, String projectId) throws Exception {
    // Initialize the client that manages connections to the BusinessGlossaryService
    try (BusinessGlossaryServiceClient client = BusinessGlossaryServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/glossaries/%s/terms/%s",
              projectId, locationId, glossaryId, termId);

      GetGlossaryTermRequest request = GetGlossaryTermRequest.newBuilder().setName(name).build();

      GlossaryTerm glossaryTerm = client.getGlossaryTerm(request);
      System.out.println("Retrieved glossary term: " + glossaryTerm.getName());
      System.out.println("Display name: " + glossaryTerm.getDisplayName());
    }
  }
}
// [END dataplex_v1_businessglossaryservice_glossaryterm_get]
