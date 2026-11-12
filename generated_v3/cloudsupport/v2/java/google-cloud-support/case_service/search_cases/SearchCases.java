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

package com.google.cloud.cloudsupport.v2;

// [START cloudsupport_v2_caseservice_cases_search]
import com.google.cloud.support.v2.Case;
import com.google.cloud.support.v2.CaseServiceClient;
import com.google.cloud.support.v2.SearchCasesRequest;
import java.io.IOException;

public class SearchCases {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String query = "example-query";
    searchCases(projectId, query);
  }

  public static void searchCases(String projectId, String query) throws IOException {
    try (CaseServiceClient client = CaseServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);

      SearchCasesRequest request =
          SearchCasesRequest.newBuilder()
              .setParent(parent)
              .setQuery(query)
              .build();

      for (Case foundCase : client.searchCases(request).iterateAll()) {
        System.out.println("Found case: " + foundCase.getName());
        System.out.println("Display name: " + foundCase.getDisplayName());
      }
    }
  }
}
// [END cloudsupport_v2_caseservice_cases_search]
