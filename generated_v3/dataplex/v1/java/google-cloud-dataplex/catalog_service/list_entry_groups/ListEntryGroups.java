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

// [START dataplex_v1_catalogservice_entrygroups_list]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.EntryGroup;
import com.google.cloud.dataplex.v1.ListEntryGroupsRequest;
import java.io.IOException;

public class ListEntryGroups {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    listEntryGroups(locationId, projectId);
  }

  public static void listEntryGroups(String locationId, String projectId) throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListEntryGroupsRequest request =
          ListEntryGroupsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (EntryGroup entryGroup : client.listEntryGroups(request).iterateAll()) {
        System.out.println("Found entry group: " + entryGroup.getName());
      }
    }
  }
}
// [END dataplex_v1_catalogservice_entrygroups_list]
