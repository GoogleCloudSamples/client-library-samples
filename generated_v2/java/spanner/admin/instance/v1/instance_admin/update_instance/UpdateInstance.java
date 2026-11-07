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

package com.google.cloud.spanner.v1;

// [START spanner_v1_instanceadmin_instance_update]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.protobuf.FieldMask;
import com.google.spanner.admin.instance.v1.Instance;
import com.google.spanner.admin.instance.v1.InstanceName;
import java.util.concurrent.TimeUnit;

public class UpdateInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String instanceId = "example-instance_id";
    updateInstance(projectId, instanceId);
  }

  public static void updateInstance(String projectId, String instanceId) throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      Instance instance =
          Instance.newBuilder()
              .setName(InstanceName.of(projectId, instanceId).toString())
              .setDisplayName("Updated Display Name")
              .build();
      FieldMask fieldMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Wait for the instance update operation to complete.
      Instance response = client.updateInstanceAsync(instance, fieldMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated instance: " + response.getName());
    }
  }
}
// [END spanner_v1_instanceadmin_instance_update]
