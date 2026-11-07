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

// [START container_v1beta1_clustermanager_start_ip_rotation]
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.Operation;
import com.google.container.v1beta1.StartIPRotationRequest;
import java.io.IOException;

public class StartIpRotation {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String clusterId = "example-cluster-id";
    boolean rotateCredentials = true;
    startIpRotation(projectId, locationId, clusterId, rotateCredentials);
  }

  public static void startIpRotation(
      String projectId, String locationId, String clusterId, boolean rotateCredentials)
      throws IOException {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/clusters/%s", projectId, locationId, clusterId);

      StartIPRotationRequest request =
          StartIPRotationRequest.newBuilder()
              .setName(name)
              .setRotateCredentials(rotateCredentials)
              .build();

      Operation response;
      try {
        response = client.startIPRotation(request);
      } catch (InvalidArgumentException e) {
        // If an IP rotation is already in progress, rotation mode cannot be toggled.
        // Retry with the existing rotation mode.
        if (e.getMessage() != null && e.getMessage().contains("Rotation mode cannot be toggled")) {
          request =
              StartIPRotationRequest.newBuilder()
                  .setName(name)
                  .setRotateCredentials(!rotateCredentials)
                  .build();
          response = client.startIPRotation(request);
        } else {
          throw e;
        }
      }

      System.out.printf("Initiated IP rotation. Operation: %s%n", response.getName());
      System.out.printf("Operation status: %s%n", response.getStatus());
    }
  }

  public static void startIpRotation(
      String projectId, String locationId, String clusterId, String rotateCredentials)
      throws IOException {
    startIpRotation(projectId, locationId, clusterId, Boolean.parseBoolean(rotateCredentials));
  }
}
// [END container_v1beta1_clustermanager_start_ip_rotation]
