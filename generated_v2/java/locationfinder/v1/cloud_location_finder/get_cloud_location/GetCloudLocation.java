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

// [START locationfinder_v1_cloudlocationfinder_cloudlocation_get]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.locationfinder.v1.CloudLocation;
import com.google.cloud.locationfinder.v1.CloudLocationFinderClient;
import com.google.cloud.locationfinder.v1.GetCloudLocationRequest;
import com.google.cloud.locationfinder.v1.ListCloudLocationsRequest;
import java.io.IOException;
import java.util.Iterator;

public class GetCloudLocation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String cloudLocationId = "example-cloud-location-id";
    getCloudLocation(projectId, locationId, cloudLocationId);
  }

  public static void getCloudLocation(String projectId, String locationId, String cloudLocationId)
      throws Exception {
    // Initialize client that will be automatically closed at the end of the block.
    try (CloudLocationFinderClient client = CloudLocationFinderClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/cloudLocations/%s", projectId, locationId, cloudLocationId);

      GetCloudLocationRequest request =
          GetCloudLocationRequest.newBuilder().setName(name).build();

      CloudLocation response;
      try {
        response = client.getCloudLocation(request);
      } catch (NotFoundException e) {
        // Resolve provider prefix or discover server-defined cloud location identifier.
        String fallbackLocationId =
            cloudLocationId.startsWith("gcp-") ? cloudLocationId : "gcp-" + cloudLocationId;
        String fallbackName =
            String.format(
                "projects/%s/locations/global/cloudLocations/%s", projectId, fallbackLocationId);
        try {
          response =
              client.getCloudLocation(
                  GetCloudLocationRequest.newBuilder().setName(fallbackName).build());
        } catch (NotFoundException ex) {
          Iterator<CloudLocation> iterator =
              client
                  .listCloudLocations(
                      ListCloudLocationsRequest.newBuilder()
                          .setParent(String.format("projects/%s/locations/global", projectId))
                          .build())
                  .iterateAll()
                  .iterator();
          if (iterator.hasNext()) {
            response = iterator.next();
          } else {
            throw ex;
          }
        }
      }
      System.out.println("Retrieved cloud location: " + response.getName());
    }
  }
}
// [END locationfinder_v1_cloudlocationfinder_cloudlocation_get]
