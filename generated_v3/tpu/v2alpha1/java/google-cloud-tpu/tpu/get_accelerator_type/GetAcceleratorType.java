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

package com.google.cloud.tpu.v2alpha1;

// [START tpu_v2alpha1_tpu_acceleratortype_get]
import com.google.cloud.tpu.v2alpha1.AcceleratorType;
import com.google.cloud.tpu.v2alpha1.AcceleratorTypeName;
import com.google.cloud.tpu.v2alpha1.GetAcceleratorTypeRequest;
import com.google.cloud.tpu.v2alpha1.TpuClient;

public class GetAcceleratorType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String acceleratorTypeId = "example-accelerator-type-id";
    getAcceleratorType(projectId, locationId, acceleratorTypeId);
  }

  public static void getAcceleratorType(
      String projectId, String locationId, String acceleratorTypeId) throws Exception {
    // Initialize client with Application Default Credentials
    try (TpuClient client = TpuClient.create()) {
      String name = AcceleratorTypeName.of(projectId, locationId, acceleratorTypeId).toString();
      GetAcceleratorTypeRequest request =
          GetAcceleratorTypeRequest.newBuilder().setName(name).build();

      AcceleratorType response = client.getAcceleratorType(request);
      System.out.println("Accelerator type name: " + response.getName());
      System.out.println("Type: " + response.getType());
    }
  }
}
// [END tpu_v2alpha1_tpu_acceleratortype_get]
