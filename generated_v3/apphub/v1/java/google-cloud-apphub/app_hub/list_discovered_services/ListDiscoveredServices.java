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

// [START apphub_v1_apphub_discoveredservices_list]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.DiscoveredService;
import java.io.IOException;

public class ListDiscoveredServices {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listDiscoveredServices(projectId, locationId);
  }

  public static void listDiscoveredServices(String projectId, String locationId) throws Exception {
    try (AppHubClient client = AppHubClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (DiscoveredService discoveredService : client.listDiscoveredServices(parent).iterateAll()) {
        System.out.println("Discovered service: " + discoveredService.getName());
      }
    }
  }
}
// [END apphub_v1_apphub_discoveredservices_list]
