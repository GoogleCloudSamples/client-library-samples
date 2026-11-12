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

package com.google.cloud.clouddeploy.v1;

// [START clouddeploy_v1_clouddeploy_targets_list]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.LocationName;
import com.google.cloud.deploy.v1.Target;
import java.io.IOException;

public class ListTargets {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listTargets(projectId, locationId);
  }

  public static void listTargets(String projectId, String locationId) throws IOException {
    // Initialize the Cloud Deploy client using Application Default Credentials
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      // Retrieve and iterate through all delivery targets in the location
      for (Target target : client.listTargets(parent).iterateAll()) {
        System.out.println("Target: " + target.getName());
      }
    }
  }
}
// [END clouddeploy_v1_clouddeploy_targets_list]
