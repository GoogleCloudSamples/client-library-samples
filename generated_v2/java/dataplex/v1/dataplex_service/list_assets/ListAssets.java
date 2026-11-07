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

// [START dataplex_v1_dataplexservice_assets_list]
import com.google.cloud.dataplex.v1.Asset;
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.ZoneName;
import java.io.IOException;

public class ListAssets {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String zoneId = "example-zone_id";
    String projectId = "example-project_id";
    listAssets(locationId, lakeId, zoneId, projectId);
  }

  public static void listAssets(
      String locationId, String lakeId, String zoneId, String projectId) throws IOException {
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      String parent = ZoneName.of(projectId, locationId, lakeId, zoneId).toString();

      for (Asset asset : client.listAssets(parent).iterateAll()) {
        System.out.println("Asset name: " + asset.getName());
        System.out.println("Asset display name: " + asset.getDisplayName());
        System.out.println("Asset state: " + asset.getState());
      }
    }
  }
}
// [END dataplex_v1_dataplexservice_assets_list]
