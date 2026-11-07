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

// [START dataplex_v1_businessglossaryservice_glossaryterm_create]
import com.google.cloud.dataplex.v1.BusinessGlossaryServiceClient;
import com.google.cloud.dataplex.v1.GlossaryName;
import com.google.cloud.dataplex.v1.GlossaryTerm;
import java.io.IOException;

public class CreateGlossaryTerm {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location-id";
    String glossaryId = "example-glossary-id";
    String termId = "example-term-id";
    String projectId = "example-project-id";
    createGlossaryTerm(locationId, glossaryId, termId, projectId);
  }

  public static void createGlossaryTerm(
      String locationId, String glossaryId, String termId, String projectId) throws IOException {
    try (BusinessGlossaryServiceClient client = BusinessGlossaryServiceClient.create()) {
      String parent = GlossaryName.of(projectId, locationId, glossaryId).toString();
      GlossaryTerm term =
          GlossaryTerm.newBuilder()
              .setParent(parent)
              .setDisplayName("Example Term")
              .setDescription("Example Description")
              .build();

      GlossaryTerm response = client.createGlossaryTerm(parent, term, termId);
      System.out.println("Created glossary term: " + response.getName());
    }
  }
}
// [END dataplex_v1_businessglossaryservice_glossaryterm_create]
