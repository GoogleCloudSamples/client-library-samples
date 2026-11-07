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

// [START locationfinder_v1_cloudlocationfinder_cloudlocations_search]
import com.google.cloud.locationfinder.v1.CloudLocation;
import com.google.cloud.locationfinder.v1.CloudLocationFinderClient;
import com.google.cloud.locationfinder.v1.SearchCloudLocationsRequest;
import java.io.IOException;

public class SearchCloudLocations {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String cloudLocationId = "gcp-us-central1";
    searchCloudLocations(projectId, locationId, cloudLocationId);
  }

  public static void searchCloudLocations(
      String projectId, String locationId, String cloudLocationId) throws IOException {
    // Cloud Location Finder requires provider-prefixed identifiers (for example, gcp-us-central1).
    String cloudLocation = cloudLocationId;
    if (cloudLocation.contains("/")) {
      cloudLocation = cloudLocation.substring(cloudLocation.lastIndexOf('/') + 1);
    }
    if (!cloudLocation.startsWith("gcp-")
        && !cloudLocation.startsWith("aws-")
        && !cloudLocation.startsWith("azure-")) {
      cloudLocation = "gcp-" + cloudLocation;
    }

    String parent = String.format("projects/%s/locations/%s", projectId, locationId);
    String sourceCloudLocation =
        String.format(
            "projects/%s/locations/%s/cloudLocations/%s",
            projectId, locationId, cloudLocation);

    // Initialize client that will be closed when the try-with-resources block exits.
    try (CloudLocationFinderClient client = CloudLocationFinderClient.create()) {
      SearchCloudLocationsRequest request =
          SearchCloudLocationsRequest.newBuilder()
              .setParent(parent)
              .setSourceCloudLocation(sourceCloudLocation)
              .build();

      for (CloudLocation result : client.searchCloudLocations(request).iterateAll()) {
        System.out.println("Cloud Location: " + result.getName());
      }
    }
  }
}
// [END locationfinder_v1_cloudlocationfinder_cloudlocations_search]
