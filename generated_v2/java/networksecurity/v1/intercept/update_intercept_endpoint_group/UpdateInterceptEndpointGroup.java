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

// [START networksecurity_v1_intercept_interceptendpointgroup_update]
import com.google.cloud.networksecurity.v1.InterceptClient;
import com.google.cloud.networksecurity.v1.InterceptEndpointGroup;
import com.google.cloud.networksecurity.v1.InterceptEndpointGroupName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateInterceptEndpointGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String interceptEndpointGroupId = "example-intercept_endpoint_group_id";
    updateInterceptEndpointGroup(projectId, locationId, interceptEndpointGroupId);
  }

  public static void updateInterceptEndpointGroup(
      String projectId, String locationId, String interceptEndpointGroupId) throws Exception {
    try (InterceptClient client = InterceptClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      InterceptEndpointGroup interceptEndpointGroup =
          InterceptEndpointGroup.newBuilder()
              .setName(
                  InterceptEndpointGroupName.of(projectId, locationId, interceptEndpointGroupId)
                      .toString())
              .setDescription("Updated intercept endpoint group description")
              .build();

      // Initiate the long-running operation and wait for completion
      InterceptEndpointGroup response =
          client
              .updateInterceptEndpointGroupAsync(interceptEndpointGroup, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated intercept endpoint group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_intercept_interceptendpointgroup_update]
