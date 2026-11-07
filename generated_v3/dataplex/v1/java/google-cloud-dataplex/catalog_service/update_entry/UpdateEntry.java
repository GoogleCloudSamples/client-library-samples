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

// [START dataplex_v1_catalogservice_entry_update]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.EntrySource;
import com.google.protobuf.FieldMask;

public class UpdateEntry {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String entryGroupId = "example-entry-group-id";
    String entryId = "example-entry-id";
    updateEntry(projectId, locationId, entryGroupId, entryId);
  }

  public static void updateEntry(
      String projectId, String locationId, String entryGroupId, String entryId) throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      Entry entry =
          Entry.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/entryGroups/%s/entries/%s",
                      projectId, locationId, entryGroupId, entryId))
              .setEntrySource(
                  EntrySource.newBuilder().setDescription("Updated entry description").build())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("entry_source.description").build();

      Entry response = client.updateEntry(entry, updateMask);
      System.out.println("Updated entry: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_entry_update]
