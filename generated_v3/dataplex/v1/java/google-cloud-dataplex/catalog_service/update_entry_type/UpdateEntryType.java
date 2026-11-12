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

// [START dataplex_v1_catalogservice_entrytype_update]
import com.google.cloud.dataplex.v1.CatalogServiceClient;
import com.google.cloud.dataplex.v1.EntryType;
import com.google.cloud.dataplex.v1.EntryTypeName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateEntryType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String entryTypeId = "example-entry_type_id";
    updateEntryType(projectId, locationId, entryTypeId);
  }

  public static void updateEntryType(String projectId, String locationId, String entryTypeId)
      throws Exception {
    try (CatalogServiceClient client = CatalogServiceClient.create()) {
      // Build the entry type resource name and specify updated fields
      EntryType entryType =
          EntryType.newBuilder()
              .setName(EntryTypeName.of(projectId, locationId, entryTypeId).toString())
              .setDescription("Updated description")
              .build();

      // Specify the fields to update
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Initiate the long-running operation and wait for completion
      EntryType response = client.updateEntryTypeAsync(entryType, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated entry type: " + response.getName());
    }
  }
}
// [END dataplex_v1_catalogservice_entrytype_update]
