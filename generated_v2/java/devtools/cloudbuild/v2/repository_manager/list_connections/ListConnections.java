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

package com.google.cloud.cloudbuild.v2;

// [START cloudbuild_v2_repositorymanager_connections_list]
import com.google.cloud.devtools.cloudbuild.v2.RepositoryManagerClient;
import com.google.cloudbuild.v2.Connection;
import java.io.IOException;

public class ListConnections {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listConnections(projectId, locationId);
  }

  public static void listConnections(String projectId, String locationId) throws IOException {
    // Initialize client that sends requests. The client can be reused for multiple requests.
    try (RepositoryManagerClient client = RepositoryManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Connection connection : client.listConnections(parent).iterateAll()) {
        System.out.println("Connection: " + connection.getName());
      }
    }
  }
}
// [END cloudbuild_v2_repositorymanager_connections_list]
