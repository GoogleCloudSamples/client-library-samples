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

// [START clouddeploy_v1_clouddeploy_customtargettypes_list]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.CustomTargetType;
import com.google.cloud.deploy.v1.LocationName;
import java.io.IOException;

public class ListCustomTargetTypes {

  public static void main(String[] args) throws IOException {
    // Specify the Google Cloud project ID and region.
    String projectId = "example-project-id";
    String locationId = "us-central1";
    listCustomTargetTypes(projectId, locationId);
  }

  public static void listCustomTargetTypes(String projectId, String locationId) throws IOException {
    // Initialize the Cloud Deploy client.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (CustomTargetType customTargetType : client.listCustomTargetTypes(parent).iterateAll()) {
        System.out.println("Custom target type name: " + customTargetType.getName());
        System.out.println("Description: " + customTargetType.getDescription());
      }
    }
  }
}
// [END clouddeploy_v1_clouddeploy_customtargettypes_list]
