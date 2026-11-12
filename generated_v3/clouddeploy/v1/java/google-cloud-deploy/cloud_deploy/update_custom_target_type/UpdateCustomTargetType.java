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

// [START clouddeploy_v1_clouddeploy_customtargettype_update]
import com.google.cloud.deploy.v1.CloudDeployClient;
import com.google.cloud.deploy.v1.CustomTargetType;
import com.google.protobuf.FieldMask;
import java.util.concurrent.TimeUnit;

public class UpdateCustomTargetType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String customTargetTypeId = "example-custom-target-type-id";
    updateCustomTargetType(projectId, locationId, customTargetTypeId);
  }

  public static void updateCustomTargetType(
      String projectId, String locationId, String customTargetTypeId) throws Exception {
    // Initializes the client with Application Default Credentials.
    try (CloudDeployClient client = CloudDeployClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      CustomTargetType customTargetType =
          CustomTargetType.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/customTargetTypes/%s",
                      projectId, locationId, customTargetTypeId))
              .setDescription("Updated custom target type description")
              .build();

      // Updates the custom target type and waits for the long-running operation to complete.
      CustomTargetType response =
          client
              .updateCustomTargetTypeAsync(customTargetType, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated custom target type: " + response.getName());
    }
  }
}
// [END clouddeploy_v1_clouddeploy_customtargettype_update]
