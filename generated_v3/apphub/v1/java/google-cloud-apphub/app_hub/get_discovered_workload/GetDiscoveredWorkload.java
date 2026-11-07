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

package com.google.cloud.apphub.v1;

// [START apphub_v1_apphub_discoveredworkload_get]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.DiscoveredWorkload;
import com.google.cloud.apphub.v1.DiscoveredWorkloadName;

public class GetDiscoveredWorkload {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String discoveredWorkloadId = "example-discovered_workload_id";
    getDiscoveredWorkload(projectId, locationId, discoveredWorkloadId);
  }

  public static void getDiscoveredWorkload(
      String projectId, String locationId, String discoveredWorkloadId) throws Exception {
    try (AppHubClient client = AppHubClient.create()) {
      String name =
          DiscoveredWorkloadName.of(projectId, locationId, discoveredWorkloadId).toString();
      DiscoveredWorkload response = client.getDiscoveredWorkload(name);
      System.out.println("Discovered Workload: " + response.getName());
    }
  }
}
// [END apphub_v1_apphub_discoveredworkload_get]
