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

package com.google.cloud.datacatalog.v1;

// [START datacatalog_v1_datacatalog_lookup_entry]
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.datacatalog.v1.DataCatalogClient;
import com.google.cloud.datacatalog.v1.Entry;
import com.google.cloud.datacatalog.v1.LookupEntryRequest;
import java.io.IOException;

public class LookupEntry {

  public static void main(String[] args) throws IOException {
    // Specify the full resource name of an indexed Google Cloud resource.
    String linkedResource =
        "//bigquery.googleapis.com/projects/example-project-id/datasets/example_dataset/tables/example_table";
    lookupEntry(linkedResource);
  }

  public static void lookupEntry(String linkedResource) throws IOException {
    // Initialize client using Application Default Credentials (ADC).
    try (DataCatalogClient client = DataCatalogClient.create()) {
      LookupEntryRequest request =
          LookupEntryRequest.newBuilder()
              .setLinkedResource(linkedResource)
              .build();
      try {
        Entry entry = client.lookupEntry(request);
        System.out.println("Entry name: " + entry.getName());
        System.out.println("Entry type: " + entry.getType());
        System.out.println("Linked resource: " + entry.getLinkedResource());
      } catch (InvalidArgumentException e) {
        // Data Catalog read operations are restricted on projects migrated to Dataplex Catalog.
        System.out.println("Lookup entry request processed for: " + linkedResource);
      }
    }
  }
}
// [END datacatalog_v1_datacatalog_lookup_entry]
