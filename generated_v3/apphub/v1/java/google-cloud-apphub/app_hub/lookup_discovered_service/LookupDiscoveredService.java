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

// [START apphub_v1_apphub_lookup_discovered_service]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.DiscoveredService;
import com.google.cloud.apphub.v1.LocationName;
import com.google.cloud.apphub.v1.LookupDiscoveredServiceRequest;
import com.google.cloud.apphub.v1.LookupDiscoveredServiceResponse;

public class LookupDiscoveredService {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String uri = "example-uri";
    lookupDiscoveredService(projectId, locationId, uri);
  }

  public static void lookupDiscoveredService(
      String projectId, String locationId, String uri) throws Exception {
    try (AppHubClient client = AppHubClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      LookupDiscoveredServiceRequest request =
          LookupDiscoveredServiceRequest.newBuilder()
              .setParent(parent)
              .setUri(uri)
              .build();

      LookupDiscoveredServiceResponse response = client.lookupDiscoveredService(request);
      DiscoveredService discoveredService = response.getDiscoveredService();

      System.out.println("Discovered Service Name: " + discoveredService.getName());
    }
  }
}
// [END apphub_v1_apphub_lookup_discovered_service]
