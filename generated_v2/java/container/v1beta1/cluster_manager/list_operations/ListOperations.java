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

package com.google.cloud.container.v1beta1;

// [START container_v1beta1_clustermanager_operations_list]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.ListOperationsRequest;
import com.google.container.v1beta1.ListOperationsResponse;
import com.google.container.v1beta1.Operation;

public class ListOperations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    listOperations(projectId, locationId);
  }

  public static void listOperations(String projectId, String locationId) throws Exception {
    // Initialize the client using Application Default Credentials
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListOperationsRequest request =
          ListOperationsRequest.newBuilder().setParent(parent).build();

      ListOperationsResponse response = client.listOperations(request);
      for (Operation operation : response.getOperationsList()) {
        System.out.printf(
            "Operation Name: %s, Status: %s, Type: %s%n",
            operation.getName(), operation.getStatus(), operation.getOperationType());
      }
    }
  }
}
// [END container_v1beta1_clustermanager_operations_list]
