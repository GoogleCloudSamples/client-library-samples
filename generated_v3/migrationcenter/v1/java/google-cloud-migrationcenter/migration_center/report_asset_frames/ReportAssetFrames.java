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

// [START migrationcenter_v1_migrationcenter_report_asset_frames]
import com.google.cloud.migrationcenter.v1.AssetFrame;
import com.google.cloud.migrationcenter.v1.Frames;
import com.google.cloud.migrationcenter.v1.MachineDetails;
import com.google.cloud.migrationcenter.v1.MigrationCenterClient;
import com.google.cloud.migrationcenter.v1.ReportAssetFramesRequest;
import com.google.cloud.migrationcenter.v1.ReportAssetFramesResponse;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.time.Instant;

public class ReportAssetFrames {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sourceId = "example-source-id";
    reportAssetFrames(projectId, locationId, sourceId);
  }

  public static void reportAssetFrames(String projectId, String locationId, String sourceId)
      throws IOException {
    try (MigrationCenterClient client = MigrationCenterClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      String source =
          String.format("projects/%s/locations/%s/sources/%s", projectId, locationId, sourceId);

      Instant now = Instant.now();
      Timestamp reportTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();

      MachineDetails machineDetails =
          MachineDetails.newBuilder()
              .setUuid("example-machine-uuid")
              .setMachineName("example-machine-name")
              .setCoreCount(4)
              .setMemoryMb(16384)
              .setPowerState(MachineDetails.PowerState.ACTIVE)
              .build();

      AssetFrame assetFrame =
          AssetFrame.newBuilder()
              .setReportTime(reportTime)
              .setMachineDetails(machineDetails)
              .build();

      Frames frames = Frames.newBuilder().addFramesData(assetFrame).build();

      ReportAssetFramesRequest request =
          ReportAssetFramesRequest.newBuilder()
              .setParent(parent)
              .setSource(source)
              .setFrames(frames)
              .build();

      ReportAssetFramesResponse response = client.reportAssetFrames(request);
      System.out.printf("Successfully reported asset frames for source: %s%n", source);
      System.out.println(response);
    }
  }
}
// [END migrationcenter_v1_migrationcenter_report_asset_frames]
