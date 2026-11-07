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

package com.google.cloud.enterpriseknowledgegraph.v1;

// [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_publickg_search]
import com.google.cloud.enterpriseknowledgegraph.v1.EnterpriseKnowledgeGraphServiceClient;
import com.google.cloud.enterpriseknowledgegraph.v1.SearchPublicKgRequest;
import com.google.cloud.enterpriseknowledgegraph.v1.SearchPublicKgResponse;
import java.io.IOException;

public class SearchPublicKg {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Public Knowledge Graph typically uses the 'global' location.
    String locationId = "global";
    searchPublicKg(projectId, locationId);
  }

  public static void searchPublicKg(String projectId, String locationId) throws Exception {
    try (EnterpriseKnowledgeGraphServiceClient client =
        EnterpriseKnowledgeGraphServiceClient.create()) {
      String query = "Google";
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      SearchPublicKgRequest request =
          SearchPublicKgRequest.newBuilder()
              .setParent(parent)
              .setQuery(query)
              .build();

      SearchPublicKgResponse response = client.searchPublicKg(request);
      System.out.println("Search results: " + response.getItemListElement());
    }
  }
}
// [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_publickg_search]
