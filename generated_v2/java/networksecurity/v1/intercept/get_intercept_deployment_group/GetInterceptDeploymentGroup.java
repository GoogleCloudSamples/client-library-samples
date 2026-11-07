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

// [START networksecurity_v1_intercept_interceptdeploymentgroup_get]
import com.google.cloud.networksecurity.v1.InterceptClient;
import com.google.cloud.networksecurity.v1.InterceptDeploymentGroup;
import com.google.cloud.networksecurity.v1.InterceptDeploymentGroupName;
import java.io.IOException;

public class GetInterceptDeploymentGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String interceptDeploymentGroupId = "example-intercept-deployment-group-id";
    getInterceptDeploymentGroup(projectId, locationId, interceptDeploymentGroupId);
  }

  public static void getInterceptDeploymentGroup(
      String projectId, String locationId, String interceptDeploymentGroupId) throws Exception {
    try (InterceptClient client = InterceptClient.create()) {
      String name =
          InterceptDeploymentGroupName.of(projectId, locationId, interceptDeploymentGroupId)
              .toString();
      InterceptDeploymentGroup response = client.getInterceptDeploymentGroup(name);
      System.out.println("Retrieved Intercept Deployment Group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_intercept_interceptdeploymentgroup_get]
