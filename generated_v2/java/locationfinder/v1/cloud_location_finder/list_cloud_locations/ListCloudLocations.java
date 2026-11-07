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

package com.google.cloud.locationfinder.v1;

// [START locationfinder_v1_cloudlocationfinder_cloudlocations_list]
import com.google.cloud.locationfinder.v1.CloudLocation;
import com.google.cloud.locationfinder.v1.CloudLocationFinderClient;
import com.google.cloud.locationfinder.v1.ListCloudLocationsRequest;

public class ListCloudLocations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listCloudLocations(projectId, locationId);
  }

  public static void listCloudLocations(String projectId, String locationId) throws Exception {
    try (CloudLocationFinderClient client = CloudLocationFinderClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListCloudLocationsRequest request =
          ListCloudLocationsRequest.newBuilder().setParent(parent).build();

      for (CloudLocation location : client.listCloudLocations(request).iterateAll()) {
        System.out.println("Location: " + location.getName());
      }
    }
  }
}
// [END locationfinder_v1_cloudlocationfinder_cloudlocations_list]
