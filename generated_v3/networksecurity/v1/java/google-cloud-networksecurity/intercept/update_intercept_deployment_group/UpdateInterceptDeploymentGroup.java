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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_intercept_interceptdeploymentgroup_update]
import com.google.cloud.networksecurity.v1.InterceptClient;
import com.google.cloud.networksecurity.v1.InterceptDeploymentGroup;
import com.google.cloud.networksecurity.v1.InterceptDeploymentGroupName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateInterceptDeploymentGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String interceptDeploymentGroupId = "example-intercept_deployment_group_id";
    updateInterceptDeploymentGroup(projectId, locationId, interceptDeploymentGroupId);
  }

  public static void updateInterceptDeploymentGroup(
      String projectId, String locationId, String interceptDeploymentGroupId) throws Exception {
    try (InterceptClient client = InterceptClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      String deploymentGroupName =
          InterceptDeploymentGroupName.of(projectId, locationId, interceptDeploymentGroupId)
              .toString();

      InterceptDeploymentGroup interceptDeploymentGroup =
          InterceptDeploymentGroup.newBuilder()
              .setName(deploymentGroupName)
              .setDescription("Updated intercept deployment group description")
              .build();

      // Initiate the update operation and wait for completion
      InterceptDeploymentGroup response =
          client
              .updateInterceptDeploymentGroupAsync(interceptDeploymentGroup, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated intercept deployment group: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networksecurity_v1_intercept_interceptdeploymentgroup_update]
