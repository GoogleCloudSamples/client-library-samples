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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
import com.google.cloud.monitoring.v3.UptimeCheckServiceClient;
import com.google.monitoring.v3.UptimeCheckConfig;
import com.google.monitoring.v3.UptimeCheckConfigName;

public class GetUptimeCheckConfig {

  public static void main(String[] args) throws Exception {
    String uptimeCheckConfigId = "example-uptime_check_config_id";
    String projectId = "example-project_id";
    getUptimeCheckConfig(uptimeCheckConfigId, projectId);
  }

  public static void getUptimeCheckConfig(String uptimeCheckConfigId, String projectId)
      throws Exception {
    try (UptimeCheckServiceClient client = UptimeCheckServiceClient.create()) {
      String name = UptimeCheckConfigName.format(projectId, uptimeCheckConfigId);
      UptimeCheckConfig uptimeCheckConfig = client.getUptimeCheckConfig(name);
      System.out.println("Retrieved Uptime check config: " + uptimeCheckConfig.getName());
      System.out.println("Display name: " + uptimeCheckConfig.getDisplayName());
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
