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

// [START dataplex_v1_dataplexservice_zones_list]
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.LakeName;
import com.google.cloud.dataplex.v1.Zone;

public class ListZones {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String projectId = "example-project_id";
    listZones(locationId, lakeId, projectId);
  }

  public static void listZones(String locationId, String lakeId, String projectId)
      throws Exception {
    // Initialize client that will be used to send requests.
    // This client only needs to be created once, and can be reused for multiple requests.
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      String parent = LakeName.of(projectId, locationId, lakeId).toString();

      for (Zone zone : client.listZones(parent).iterateAll()) {
        System.out.println("Zone name: " + zone.getName());
        System.out.println("Zone display name: " + zone.getDisplayName());
        System.out.println("Zone type: " + zone.getType());
        System.out.println("Zone state: " + zone.getState());
      }
    }
  }
}
// [END dataplex_v1_dataplexservice_zones_list]
