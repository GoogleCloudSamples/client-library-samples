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

package com.google.cloud.container.v1beta1;

// [START container_v1beta1_clustermanager_serverconfig_get]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.GetServerConfigRequest;
import com.google.container.v1beta1.ServerConfig;
import java.io.IOException;

public class GetServerConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    getServerConfig(projectId, locationId);
  }

  public static void getServerConfig(String projectId, String locationId) throws IOException {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name = String.format("projects/%s/locations/%s", projectId, locationId);
      GetServerConfigRequest request = GetServerConfigRequest.newBuilder().setName(name).build();
      ServerConfig response = client.getServerConfig(request);

      System.out.println("Default cluster version: " + response.getDefaultClusterVersion());
      System.out.println("Default image type: " + response.getDefaultImageType());
      System.out.println("Valid master versions: " + response.getValidMasterVersionsList());
      System.out.println("Valid node versions: " + response.getValidNodeVersionsList());
    }
  }
}
// [END container_v1beta1_clustermanager_serverconfig_get]
