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

// [START dataplex_v1_catalogservice_lookup_entry]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.LookupEntryRequest;

public class LookupEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String entryGroupId = "example-entry_group_id";
    String entryId = "example-entry_id";
    lookupEntry(projectId, locationId, entryGroupId, entryId);
  }

  public static void lookupEntry(
      String projectId, String locationId, String entryGroupId, String entryId) throws Exception {
    // Initialize client that will be automatically closed at the end of the block.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);
      String entry =
          String.format(
              "projects/%s/locations/%s/entryGroups/%s/entries/%s",
              projectId, locationId, entryGroupId, entryId);

      LookupEntryRequest request =
          LookupEntryRequest.newBuilder()
              .setName(name)
              .setEntry(entry)
              .build();

      Entry response = client.lookupEntry(request);
      System.out.println("Entry name: " + response.getName());
      System.out.println("Entry type: " + response.getEntryType());
    }
  }
}
// [END dataplex_v1_catalogservice_lookup_entry]
