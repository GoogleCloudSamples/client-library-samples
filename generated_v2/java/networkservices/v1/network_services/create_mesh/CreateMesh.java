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

package com.google.cloud.networkservices.v1;

// [START networkservices_v1_networkservices_mesh_create]
import com.google.cloud.networkservices.v1.Mesh;
import com.google.cloud.networkservices.v1.NetworkServicesClient;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateMesh {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String meshId = "example-mesh_id";
    createMesh(projectId, locationId, meshId);
  }

  public static void createMesh(String projectId, String locationId, String meshId) throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Mesh mesh = Mesh.newBuilder()
          .setDescription("Example Service Mesh")
          .build();

      // Wait for the long-running operation to complete.
      Mesh response = client.createMeshAsync(parent, mesh, meshId).get(5, TimeUnit.MINUTES);
      System.out.println("Created mesh: " + response.getName());
    }
  }
}
// [END networkservices_v1_networkservices_mesh_create]
