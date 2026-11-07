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

// [START spanner_v1_instanceadmin_instanceconfigoperations_list]
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.longrunning.Operation;
import java.io.IOException;

public class ListInstanceConfigOperations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listInstanceConfigOperations(projectId);
  }

  public static void listInstanceConfigOperations(String projectId) throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String parent = "projects/" + projectId;
      for (Operation operation : client.listInstanceConfigOperations(parent).iterateAll()) {
        System.out.println("Operation name: " + operation.getName());
        System.out.println("Done: " + operation.getDone());
      }
    }
  }
}
// [END spanner_v1_instanceadmin_instanceconfigoperations_list]
