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

package com.google.cloud.oracledatabase.v1;

// [START oracledatabase_v1_oracledatabase_cloudexadatainfrastructures_list]
import com.google.cloud.oracledatabase.v1.CloudExadataInfrastructure;
import com.google.cloud.oracledatabase.v1.ListCloudExadataInfrastructuresRequest;
import com.google.cloud.oracledatabase.v1.LocationName;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;

public class ListCloudExadataInfrastructures {

  public static void listCloudExadataInfrastructures(String projectId, String locationId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListCloudExadataInfrastructuresRequest request =
          ListCloudExadataInfrastructuresRequest.newBuilder().setParent(parent).build();

      for (CloudExadataInfrastructure infrastructure :
          client.listCloudExadataInfrastructures(request).iterateAll()) {
        System.out.printf("Cloud Exadata Infrastructure: %s%n", infrastructure.getName());
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_cloudexadatainfrastructures_list]
