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

// [START networksecurity_v1_mirroring_mirroringendpointgroup_update]
import com.google.cloud.networksecurity.v1.MirroringClient;
import com.google.cloud.networksecurity.v1.MirroringEndpointGroup;
import com.google.cloud.networksecurity.v1.MirroringEndpointGroupName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateMirroringEndpointGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // MirroringEndpointGroup resources are globally scoped.
    String locationId = "global";
    String mirroringEndpointGroupId = "example-mirroring-endpoint-group-id";
    updateMirroringEndpointGroup(projectId, locationId, mirroringEndpointGroupId);
  }

  public static void updateMirroringEndpointGroup(
      String projectId, String locationId, String mirroringEndpointGroupId) throws Exception {
    try (MirroringClient client = MirroringClient.create()) {
      MirroringEndpointGroup mirroringEndpointGroup =
          MirroringEndpointGroup.newBuilder()
              .setName(
                  MirroringEndpointGroupName.of(
                          projectId, locationId, mirroringEndpointGroupId)
                      .toString())
              .setDescription("Updated endpoint group description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Long-running operations require waiting for the operation result to complete.
      MirroringEndpointGroup response =
          client
              .updateMirroringEndpointGroupAsync(mirroringEndpointGroup, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated mirroring endpoint group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_mirroring_mirroringendpointgroup_update]
