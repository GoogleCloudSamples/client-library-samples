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

// [START dataplex_v1_catalogservice_lookup_entry_links]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.EntryLink;
import com.google.cloud.dataplex.v1.LookupEntryLinksRequest;
import java.io.IOException;

public class LookupEntryLinks {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location-id";
    String entryGroupId = "example-entry-group-id";
    String entryId = "example-entry-id";
    String projectId = "example-project-id";
    lookupEntryLinks(locationId, entryGroupId, entryId, projectId);
  }

  public static void lookupEntryLinks(
      String locationId, String entryGroupId, String entryId, String projectId)
      throws IOException {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      String entry =
          String.format(
              "projects/%s/locations/%s/entryGroups/%s/entries/%s",
              projectId, locationId, entryGroupId, entryId);
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      LookupEntryLinksRequest request =
          LookupEntryLinksRequest.newBuilder()
              .setName(name)
              .setEntry(entry)
              .build();

      for (EntryLink entryLink : client.lookupEntryLinks(request).iterateAll()) {
        System.out.println("Entry link name: " + entryLink.getName());
      }
    }
  }
}
// [END dataplex_v1_catalogservice_lookup_entry_links]
