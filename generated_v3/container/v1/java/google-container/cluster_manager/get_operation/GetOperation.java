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

package com.google.cloud.container.v1;

// [START container_v1_clustermanager_operation_get]
import com.google.cloud.container.v1.ClusterManagerClient;
import com.google.container.v1.GetOperationRequest;
import com.google.container.v1.Operation;

public class GetOperation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String operationId = "example-operation-id";
    getOperation(projectId, locationId, operationId);
  }

  public static void getOperation(String projectId, String locationId, String operationId)
      throws Exception {
    // Initialize client that manages Google Kubernetes Engine clusters and operations.
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/operations/%s", projectId, locationId, operationId);

      GetOperationRequest request = GetOperationRequest.newBuilder().setName(name).build();

      Operation response = client.getOperation(request);
      System.out.printf("Operation: %s%n", response.getName());
      System.out.printf("Status: %s%n", response.getStatus());
    }
  }
}
// [END container_v1_clustermanager_operation_get]
