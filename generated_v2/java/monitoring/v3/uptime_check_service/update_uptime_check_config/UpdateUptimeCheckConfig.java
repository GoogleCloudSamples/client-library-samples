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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_update]
import com.google.cloud.monitoring.v3.UptimeCheckServiceClient;
import com.google.monitoring.v3.UpdateUptimeCheckConfigRequest;
import com.google.monitoring.v3.UptimeCheckConfig;
import com.google.monitoring.v3.UptimeCheckConfigName;
import com.google.protobuf.FieldMask;

public class UpdateUptimeCheckConfig {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String uptimeCheckConfigId = "example-uptime-check-config-id";
    updateUptimeCheckConfig(projectId, uptimeCheckConfigId);
  }

  public static void updateUptimeCheckConfig(String projectId, String uptimeCheckConfigId)
      throws Exception {
    try (UptimeCheckServiceClient client = UptimeCheckServiceClient.create()) {
      UptimeCheckConfig uptimeCheckConfig =
          UptimeCheckConfig.newBuilder()
              .setName(
                  UptimeCheckConfigName.ofProjectUptimeCheckConfigName(
                          projectId, uptimeCheckConfigId)
                      .toString())
              .setDisplayName("Updated Uptime Check")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      UpdateUptimeCheckConfigRequest request =
          UpdateUptimeCheckConfigRequest.newBuilder()
              .setUptimeCheckConfig(uptimeCheckConfig)
              .setUpdateMask(updateMask)
              .build();

      UptimeCheckConfig response = client.updateUptimeCheckConfig(request);
      System.out.println("Updated Uptime check config: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_update]
