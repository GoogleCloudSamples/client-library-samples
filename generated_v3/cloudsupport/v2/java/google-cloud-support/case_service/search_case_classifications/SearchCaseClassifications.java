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

// [START cloudsupport_v2_caseservice_caseclassifications_search]
import com.google.cloud.support.v2.CaseClassification;
import com.google.cloud.support.v2.CaseServiceClient;
import com.google.cloud.support.v2.SearchCaseClassificationsRequest;
import java.io.IOException;

public class SearchCaseClassifications {

  public static void main(String[] args) throws IOException {
    // Specify a query string to filter support classifications, such as "Compute Engine".
    String query = "Compute Engine";
    searchCaseClassifications(query);
  }

  public static void searchCaseClassifications(String query) throws IOException {
    // Initialize the client in a try-with-resources statement to handle cleanup.
    try (CaseServiceClient client = CaseServiceClient.create()) {
      SearchCaseClassificationsRequest.Builder requestBuilder =
          SearchCaseClassificationsRequest.newBuilder();

      if (query != null && !query.trim().isEmpty()) {
        // Case classifications require filter expressions targeting fields like displayName or id.
        String filter = query;
        if (!filter.contains(":") && !filter.contains("=")) {
          filter = String.format("displayName:\"%s\"", filter.replace("\"", ""));
        }
        requestBuilder.setQuery(filter);
      }

      SearchCaseClassificationsRequest request = requestBuilder.build();

      for (CaseClassification classification :
          client.searchCaseClassifications(request).iterateAll()) {
        System.out.printf(
            "Classification ID: %s, Display Name: %s%n",
            classification.getId(), classification.getDisplayName());
      }
    }
  }
}
// [END cloudsupport_v2_caseservice_caseclassifications_search]
