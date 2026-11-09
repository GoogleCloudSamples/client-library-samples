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

package com.google.cloud.tpu.v2;

// [START tpu_v2_tpu_runtimeversion_get]
import com.google.cloud.tpu.v2.GetRuntimeVersionRequest;
import com.google.cloud.tpu.v2.RuntimeVersion;
import com.google.cloud.tpu.v2.RuntimeVersionName;
import com.google.cloud.tpu.v2.TpuClient;

public class GetRuntimeVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String runtimeVersionId = "example-runtime_version_id";
    getRuntimeVersion(projectId, locationId, runtimeVersionId);
  }

  public static void getRuntimeVersion(
      String projectId, String locationId, String runtimeVersionId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (TpuClient client = TpuClient.create()) {
      String name = RuntimeVersionName.of(projectId, locationId, runtimeVersionId).toString();
      GetRuntimeVersionRequest request =
          GetRuntimeVersionRequest.newBuilder().setName(name).build();

      RuntimeVersion response = client.getRuntimeVersion(request);
      System.out.println("Runtime Version Name: " + response.getName());
      System.out.println("Runtime Version: " + response.getVersion());
    }
  }
}
// [END tpu_v2_tpu_runtimeversion_get]
