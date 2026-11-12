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

package com.google.cloud.container.v1;

// [START container_v1_clustermanager_serverconfig_get]
import com.google.cloud.container.v1.ClusterManagerClient;
import com.google.container.v1.ServerConfig;

public class GetServerConfig {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String locationId = "us-central1";
    getServerConfig(projectId, locationId);
  }

  public static void getServerConfig(String projectId, String locationId) throws Exception {
    // Initialize the client in a try-with-resources block for automatic cleanup.
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);

      ServerConfig response = client.getServerConfig(name);

      System.out.println("Default cluster version: " + response.getDefaultClusterVersion());
      System.out.println("Valid master versions: " + response.getValidMasterVersionsList());
      System.out.println("Valid node versions: " + response.getValidNodeVersionsList());
    }
  }
}
// [END container_v1_clustermanager_serverconfig_get]
