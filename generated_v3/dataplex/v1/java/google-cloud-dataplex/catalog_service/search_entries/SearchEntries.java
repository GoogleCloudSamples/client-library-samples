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

// [START dataplex_v1_catalogservice_entries_search]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.SearchEntriesRequest;
import com.google.cloud.dataplex.v1.SearchEntriesResult;

public class SearchEntries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Dataplex Universal Catalog SearchEntries requires the location to be 'global'.
    String locationId = "global";
    searchEntries(projectId, locationId);
  }

  public static void searchEntries(String projectId, String locationId) throws Exception {
    // Initialize the client that will be used to send requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String query = "type=TABLE";
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      SearchEntriesRequest request =
          SearchEntriesRequest.newBuilder()
              .setName(name)
              .setQuery(query)
              .build();

      for (SearchEntriesResult result : client.searchEntries(request).iterateAll()) {
        System.out.println("Entry name: " + result.getDataplexEntry().getName());
        System.out.println("Entry type: " + result.getDataplexEntry().getEntryType());
      }
    }
  }
}
// [END dataplex_v1_catalogservice_entries_search]
