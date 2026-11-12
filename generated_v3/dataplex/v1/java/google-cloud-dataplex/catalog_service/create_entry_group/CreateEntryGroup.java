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

// [START dataplex_v1_catalogservice_entrygroup_create]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.EntryGroup;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateEntryGroup {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String entryGroupId = "example-entry_group_id";
    String projectId = "example-project_id";
    createEntryGroup(locationId, entryGroupId, projectId);
  }

  public static void createEntryGroup(String locationId, String entryGroupId, String projectId)
      throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      EntryGroup entryGroup =
          EntryGroup.newBuilder()
              .setDisplayName("Example Entry Group")
              .setDescription("Description of the example entry group")
              .build();
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // CreateEntryGroup is a long-running operation. Wait for completion.
      EntryGroup response =
          client.createEntryGroupAsync(parent, entryGroup, entryGroupId).get(5, TimeUnit.MINUTES);

      System.out.println("Created entry group: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_entrygroup_create]
