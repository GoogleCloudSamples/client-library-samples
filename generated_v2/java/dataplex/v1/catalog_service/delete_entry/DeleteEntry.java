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

// [START dataplex_v1_catalogservice_entry_delete]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.Entry;
import com.google.cloud.dataplex.v1.EntryName;

public class DeleteEntry {

  public static void main(String[] args) throws Exception {
    String projectId = args[0];
    String locationId = args[1];
    String entryGroupId = args[2];
    String entryId = args[3];
    deleteEntry(projectId, locationId, entryGroupId, entryId);
  }

  public static void deleteEntry(
      String projectId, String locationId, String entryGroupId, String entryId) throws Exception {
    // Initialize the client; it can be reused for multiple requests.
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String name = EntryName.of(projectId, locationId, entryGroupId, entryId).toString();
      Entry response = client.deleteEntry(name);
      System.out.println("Entry deleted successfully: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_entry_delete]
