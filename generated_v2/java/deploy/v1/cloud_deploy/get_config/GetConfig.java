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

// [START clouddeploy_v1_clouddeploy_config_get]
package com.google.cloud.clouddeploy.v1;

import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.Config;
import java.io.IOException;

public class GetConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    getConfig(projectId, locationId);
  }

  public static void getConfig(String projectId, String locationId) throws IOException {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name = String.format("projects/%s/locations/%s/config", projectId, locationId);

      Config response = client.getConfig(name);

      System.out.println("Retrieved Cloud Deploy configuration: " + response.getName());
      System.out.println("Default Skaffold version: " + response.getDefaultSkaffoldVersion());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_config_get]
