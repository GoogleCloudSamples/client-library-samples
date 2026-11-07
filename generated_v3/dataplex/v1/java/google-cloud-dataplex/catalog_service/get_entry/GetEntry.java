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

// [START dataplex_v1_catalogservice_entry_get]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.GetEntryRequest;

public class GetEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String entryGroupId = "example-entry_group_id";
    String entryId = "example-entry_id";
    getEntry(projectId, locationId, entryGroupId, entryId);
  }

  public static void getEntry(
      String projectId, String locationId, String entryGroupId, String entryId) throws Exception {
    // Initialize client that will be closed when the block finishes
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/entryGroups/%s/entries/%s",
              projectId, locationId, entryGroupId, entryId);

      GetEntryRequest request = GetEntryRequest.newBuilder().setName(name).build();

      Entry entry = client.getEntry(request);

      System.out.println("Retrieved entry: " + entry.getName());
      System.out.println("Entry type: " + entry.getEntryType());
    }
  }
}
// [END dataplex_v1_catalogservice_entry_get]
