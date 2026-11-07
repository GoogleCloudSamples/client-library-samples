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

// [START dataplex_v1_catalogservice_modify_entry]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.EntrySource;
import com.google.cloud.dataplex.v1.UpdateEntryRequest;
import com.google.protobuf.FieldMask;

public class ModifyEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String entryGroupId = "example-entry-group-id";
    String entryId = "example-entry-id";
    modifyEntry(projectId, locationId, entryGroupId, entryId);
  }

  public static void modifyEntry(
      String projectId, String locationId, String entryGroupId, String entryId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);
      String entryName =
          String.format(
              "projects/%s/locations/%s/entryGroups/%s/entries/%s",
              projectId, locationId, entryGroupId, entryId);

      Entry entry =
          Entry.newBuilder()
              .setName(entryName)
              .setEntrySource(
                  EntrySource.newBuilder().setDescription("Updated description").build())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("entry_source.description").build();

      UpdateEntryRequest request =
          UpdateEntryRequest.newBuilder()
              .setEntry(entry)
              .setUpdateMask(updateMask)
              .build();

      Entry response = client.updateEntry(request);
      System.out.println("Modified entry name: " + response.getName());
      System.out.println(
          "Updated description: " + response.getEntrySource().getDescription());
    }
  }
}
// [END dataplex_v1_catalogservice_modify_entry]
