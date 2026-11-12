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

// [START dataplex_v1_catalogservice_entries_list]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.EntryGroupName;
import java.io.IOException;

public class ListEntries {

  public static void main(String[] args) throws IOException {
    if (args.length >= 3) {
      String projectId = args[0];
      String locationId = args[1];
      String entryGroupId = args[2];
      listEntries(projectId, locationId, entryGroupId);
    }
  }

  public static void listEntries(String projectId, String locationId, String entryGroupId)
      throws IOException {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String parent = EntryGroupName.of(projectId, locationId, entryGroupId).toString();

      // Iterate through entries and output their resource names
      for (Entry entry : client.listEntries(parent).iterateAll()) {
        System.out.println("Entry name: " + entry.getName());
      }
    }
  }
}
// [END dataplex_v1_catalogservice_entries_list]
