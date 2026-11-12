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

package com.google.cloud.discoveryengine.v1;

// [START discoveryengine_v1_completionservice_purge_suggestion_deny_list_entries]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.discoveryengine.v1.CompletionServiceClient;
import com.google.cloud.discoveryengine.v1.DataStoreName;
import com.google.cloud.discoveryengine.v1.PurgeSuggestionDenyListEntriesMetadata;
import com.google.cloud.discoveryengine.v1.PurgeSuggestionDenyListEntriesRequest;
import com.google.cloud.discoveryengine.v1.PurgeSuggestionDenyListEntriesResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class PurgeSuggestionDenyListEntries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String collectionId = "example-collection_id";
    String dataStoreId = "example-data_store_id";
    purgeSuggestionDenyListEntries(projectId, locationId, collectionId, dataStoreId);
  }

  public static void purgeSuggestionDenyListEntries(
      String projectId, String locationId, String collectionId, String dataStoreId)
      throws Exception {
    try (CompletionServiceClient client = CompletionServiceClient.create()) {
      String parent =
          DataStoreName.ofProjectLocationCollectionDataStoreName(
                  projectId, locationId, collectionId, dataStoreId)
              .toString();

      PurgeSuggestionDenyListEntriesRequest request =
          PurgeSuggestionDenyListEntriesRequest.newBuilder().setParent(parent).build();

      // Submit the purge operation and block until it finishes.
      OperationFuture<
              PurgeSuggestionDenyListEntriesResponse, PurgeSuggestionDenyListEntriesMetadata>
          future = client.purgeSuggestionDenyListEntriesAsync(request);

      PurgeSuggestionDenyListEntriesResponse response = future.get();
      System.out.printf("Purge completed. Purged entries: %d%n", response.getPurgeCount());
    }
  }
}
// [END discoveryengine_v1_completionservice_purge_suggestion_deny_list_entries]
