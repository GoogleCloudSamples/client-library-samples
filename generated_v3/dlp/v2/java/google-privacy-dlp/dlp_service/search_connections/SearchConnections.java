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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_connections_search]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.Connection;
import com.google.privacy.dlp.v2.SearchConnectionsRequest;
import java.io.IOException;

public class SearchConnections {

  public static void main(String[] args) throws Exception {
    // Provide the Google Cloud project ID to search connections in
    String projectId = "example-project-id";
    // Set locationId to "-" to search across all locations in the project
    String locationId = "-";
    searchConnections(projectId, locationId);
  }

  public static void searchConnections(String projectId, String locationId) throws Exception {
    // Initialize client that will be used to send requests
    try (DlpServiceClient client = DlpServiceClient.create()) {
      // Construct the parent resource path using project ID and wildcard location ID
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      SearchConnectionsRequest request =
          SearchConnectionsRequest.newBuilder().setParent(parent).build();

      // Send the search connections request and iterate over results
      for (Connection connection : client.searchConnections(request).iterateAll()) {
        System.out.println("Connection name: " + connection.getName());
        System.out.println("Connection state: " + connection.getState());
      }
    }
  }
}
// [END dlp_v2_dlpservice_connections_search]
