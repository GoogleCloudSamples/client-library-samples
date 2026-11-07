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

// [START oracledatabase_v1_oracledatabase_odbnetworks_list]
import com.google.cloud.oracledatabase.v1.ListOdbNetworksRequest;
import com.google.cloud.oracledatabase.v1.LocationName;
import com.google.cloud.oracledatabase.v1.OdbNetwork;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;

public class ListOdbNetworks {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listOdbNetworks(projectId, locationId);
  }

  public static void listOdbNetworks(String projectId, String locationId) throws Exception {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListOdbNetworksRequest request =
          ListOdbNetworksRequest.newBuilder()
              .setParent(parent)
              .build();

      for (OdbNetwork odbNetwork : client.listOdbNetworks(request).iterateAll()) {
        System.out.println("ODB Network: " + odbNetwork.getName());
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_odbnetworks_list]
