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

package com.google.cloud.metastore.v1;

// [START metastore_v1_dataprocmetastore_metadataimports_list]
import com.google.cloud.metastore.v1.DataprocMetastoreClient;
import com.google.cloud.metastore.v1.MetadataImport;
import com.google.cloud.metastore.v1.ServiceName;

public class ListMetadataImports {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location-id";
    String serviceId = "example-service-id";
    String projectId = "example-project-id";
    listMetadataImports(locationId, serviceId, projectId);
  }

  public static void listMetadataImports(String locationId, String serviceId, String projectId)
      throws Exception {
    // Initialize the Dataproc Metastore client with Application Default Credentials
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String parent = ServiceName.of(projectId, locationId, serviceId).toString();

      // Retrieve and print metadata imports for the specified service
      for (MetadataImport metadataImport : client.listMetadataImports(parent).iterateAll()) {
        System.out.println("Metadata Import Name: " + metadataImport.getName());
        System.out.println("State: " + metadataImport.getState());
      }
    }
  }
}
// [END metastore_v1_dataprocmetastore_metadataimports_list]
