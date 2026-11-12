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

// [START clouddeploy_v1_clouddeploy_customtargettype_get]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.CustomTargetType;
import com.google.cloud.deploy.v1.CustomTargetTypeName;

public class GetCustomTargetType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String customTargetTypeId = "example-custom-target-type-id";
    String locationId = "example-location-id";
    getCustomTargetType(projectId, customTargetTypeId, locationId);
  }

  public static void getCustomTargetType(
      String projectId, String customTargetTypeId, String locationId) throws Exception {
    try (CloudDeployClient client = CloudDeployClient.create()) {
      String name =
          CustomTargetTypeName.of(projectId, locationId, customTargetTypeId).toString();

      CustomTargetType customTargetType = client.getCustomTargetType(name);

      System.out.println("Custom target type retrieved: " + customTargetType.getName());
      System.out.println("Description: " + customTargetType.getDescription());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_customtargettype_get]
