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

package com.google.cloud.tpu.v1;

// [START tpu_v1_tpu_tensorflowversion_get]
import com.google.cloud.tpu.v1.GetTensorFlowVersionRequest;
import com.google.cloud.tpu.v1.TensorFlowVersion;
import com.google.cloud.tpu.v1.TpuClient;
import java.io.IOException;

public class GetTensorFlowVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String tensorFlowVersionId = "example-tensor-flow-version-id";
    getTensorFlowVersion(projectId, locationId, tensorFlowVersionId);
  }

  public static void getTensorFlowVersion(
      String projectId, String locationId, String tensorFlowVersionId) throws IOException {
    // Initialize client to send requests. The client can be reused for multiple requests.
    try (TpuClient client = TpuClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/tensorflowVersions/%s",
              projectId, locationId, tensorFlowVersionId);
      GetTensorFlowVersionRequest request =
          GetTensorFlowVersionRequest.newBuilder().setName(name).build();

      TensorFlowVersion response = client.getTensorFlowVersion(request);
      System.out.println("TensorFlow version name: " + response.getName());
      System.out.println("Version: " + response.getVersion());
    }
  }
}
// [END tpu_v1_tpu_tensorflowversion_get]
