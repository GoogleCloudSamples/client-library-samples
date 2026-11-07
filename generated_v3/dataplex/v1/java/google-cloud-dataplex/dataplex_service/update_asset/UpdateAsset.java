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

// [START dataplex_v1_dataplexservice_asset_update]
import com.google.cloud.dataplex.v1.Asset;
import com.google.cloud.dataplex.v1.AssetName;
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateAsset {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String zoneId = "example-zone_id";
    String assetId = "example-asset_id";
    updateAsset(projectId, locationId, lakeId, zoneId, assetId);
  }

  public static void updateAsset(
      String projectId, String locationId, String lakeId, String zoneId, String assetId)
      throws Exception {
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      Asset asset =
          Asset.newBuilder()
              .setName(
                  AssetName.of(projectId, locationId, lakeId, zoneId, assetId).toString())
              .setDescription("Updated description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // UpdateAsset is a long-running operation; wait for the operation to complete.
      Asset response = client.updateAssetAsync(asset, updateMask).get();
      System.out.println("Updated asset: " + response.getName());
    }
  }
}
// [END dataplex_v1_dataplexservice_asset_update]
