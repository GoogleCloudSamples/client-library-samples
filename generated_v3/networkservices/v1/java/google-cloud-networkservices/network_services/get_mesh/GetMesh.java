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

// [START networkservices_v1_networkservices_mesh_get]
import com.google.cloud.networkservices.v1.Mesh;
import com.google.cloud.networkservices.v1.MeshName;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;

public class GetMesh {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String meshId = "example-mesh_id";
    getMesh(projectId, locationId, meshId);
  }

  public static void getMesh(String projectId, String locationId, String meshId)
      throws IOException {
    // Initialize the client that will be used to send requests.
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = MeshName.of(projectId, locationId, meshId).toString();

      Mesh mesh = client.getMesh(name);
      System.out.println("Retrieved mesh: " + mesh.getName());
      System.out.println("Create time: " + mesh.getCreateTime());
    }
  }
}
// [END networkservices_v1_networkservices_mesh_get]
