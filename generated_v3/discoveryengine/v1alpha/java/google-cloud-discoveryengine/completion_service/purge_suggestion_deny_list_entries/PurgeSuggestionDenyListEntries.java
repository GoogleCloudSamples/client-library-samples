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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_completionservice_purge_suggestion_deny_list_entries]
import com.google.cloud.discoveryengine.v1alpha.CompletionServiceClient;
import com.google.cloud.discoveryengine.v1alpha.DataStoreName;
import com.google.cloud.discoveryengine.v1alpha.PurgeSuggestionDenyListEntriesRequest;
import com.google.cloud.discoveryengine.v1alpha.PurgeSuggestionDenyListEntriesResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class PurgeSuggestionDenyListEntries {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String collectionId = "example-collection-id";
    String dataStoreId = "example-data-store-id";
    purgeSuggestionDenyListEntries(projectId, locationId, collectionId, dataStoreId);
  }

  public static void purgeSuggestionDenyListEntries(
      String projectId, String locationId, String collectionId, String dataStoreId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CompletionServiceClient client = CompletionServiceClient.create()) {
      String parent =
          DataStoreName.ofProjectLocationCollectionDataStoreName(
                  projectId, locationId, collectionId, dataStoreId)
              .toString();

      PurgeSuggestionDenyListEntriesRequest request =
          PurgeSuggestionDenyListEntriesRequest.newBuilder()
              .setParent(parent)
              .build();

      // PurgeSuggestionDenyListEntries is a long-running operation; wait for it to complete.
      PurgeSuggestionDenyListEntriesResponse response =
          client.purgeSuggestionDenyListEntriesAsync(request).get(5, TimeUnit.MINUTES);

      System.out.println("Purge count: " + response.getPurgeCount());
    }
  }
}
// [END discoveryengine_v1alpha_completionservice_purge_suggestion_deny_list_entries]
