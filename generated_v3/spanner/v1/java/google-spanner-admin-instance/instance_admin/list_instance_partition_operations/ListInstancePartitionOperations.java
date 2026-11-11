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

// [START spanner_v1_instanceadmin_instancepartitionoperations_list]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.longrunning.Operation;
import com.google.spanner.admin.instance.v1.InstanceName;
import com.google.spanner.admin.instance.v1.ListInstancePartitionOperationsRequest;

public class ListInstancePartitionOperations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String instanceId = "example-instance_id";
    listInstancePartitionOperations(projectId, instanceId);
  }

  public static void listInstancePartitionOperations(String projectId, String instanceId)
      throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String parent = InstanceName.of(projectId, instanceId).toString();
      ListInstancePartitionOperationsRequest request =
          ListInstancePartitionOperationsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (Operation operation : client.listInstancePartitionOperations(request).iterateAll()) {
        System.out.println("Operation: " + operation.getName());
      }
    }
  }
}
// [END spanner_v1_instanceadmin_instancepartitionoperations_list]
