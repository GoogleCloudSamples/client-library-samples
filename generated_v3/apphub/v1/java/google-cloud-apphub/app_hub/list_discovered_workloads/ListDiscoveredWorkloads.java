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

// [START apphub_v1_apphub_discoveredworkloads_list]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.DiscoveredWorkload;
import com.google.cloud.apphub.v1.ListDiscoveredWorkloadsRequest;
import com.google.cloud.apphub.v1.LocationName;
import java.io.IOException;

public class ListDiscoveredWorkloads {

  public static void listDiscoveredWorkloads(String projectId, String locationId)
      throws IOException {
    // Initialize client that will be closed when use is complete.
    try (AppHubClient appHubClient = AppHubClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      ListDiscoveredWorkloadsRequest request =
          ListDiscoveredWorkloadsRequest.newBuilder().setParent(parent).build();

      for (DiscoveredWorkload discoveredWorkload :
          appHubClient.listDiscoveredWorkloads(request).iterateAll()) {
        System.out.println("Discovered workload name: " + discoveredWorkload.getName());
      }
    }
  }
}
// [END apphub_v1_apphub_discoveredworkloads_list]
