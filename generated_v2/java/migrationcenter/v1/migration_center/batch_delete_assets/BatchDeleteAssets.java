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

package com.google.cloud.migrationcenter.v1;

// [START migrationcenter_v1_migrationcenter_assets_batchdelete]
import com.google.cloud.migrationcenter.v1.BatchDeleteAssetsRequest;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;

public class BatchDeleteAssets {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String assetId = "example-asset-id";
    batchDeleteAssets(projectId, locationId, assetId);
  }

  public static void batchDeleteAssets(String projectId, String locationId, String assetId)
      throws Exception {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String names =
          String.format("projects/%s/locations/%s/assets/%s", projectId, locationId, assetId);

      BatchDeleteAssetsRequest request =
          BatchDeleteAssetsRequest.newBuilder()
              .setParent(parent)
              .addNames(names)
              .build();

      client.batchDeleteAssets(request);
      System.out.printf("Deleted asset: %s%n", names);
    }
  }
}
// [END migrationcenter_v1_migrationcenter_assets_batchdelete]
