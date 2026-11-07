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

// [START dataplex_v1_catalogservice_entrygroup_update]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.EntryGroup;
import com.google.cloud.dataplex.v1.EntryGroupName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class UpdateEntryGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String entryGroupId = "example-entry_group_id";
    updateEntryGroup(projectId, locationId, entryGroupId);
  }

  public static void updateEntryGroup(String projectId, String locationId, String entryGroupId)
      throws IOException, ExecutionException, InterruptedException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      EntryGroup entryGroup =
          EntryGroup.newBuilder()
              .setName(EntryGroupName.of(projectId, locationId, entryGroupId).toString())
              .setDescription("Updated description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Wait for the long-running operation to complete.
      EntryGroup response = client.updateEntryGroupAsync(entryGroup, updateMask).get();
      System.out.println("Updated entry group: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_entrygroup_update]
