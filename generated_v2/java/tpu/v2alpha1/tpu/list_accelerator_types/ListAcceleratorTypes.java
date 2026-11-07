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

// [START tpu_v2alpha1_tpu_acceleratortypes_list]
import com.google.cloud.tpu.v2alpha1.AcceleratorType;
import com.google.cloud.tpu.v2alpha1.LocationName;
import com.google.cloud.tpu.v2alpha1.TpuClient;
import java.io.IOException;

public class ListAcceleratorTypes {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listAcceleratorTypes(projectId, locationId);
  }

  public static void listAcceleratorTypes(String projectId, String locationId) throws Exception {
    try (TpuClient client = TpuClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (AcceleratorType acceleratorType : client.listAcceleratorTypes(parent).iterateAll()) {
        System.out.printf("Accelerator Type: %s, Type: %s%n",
            acceleratorType.getName(), acceleratorType.getType());
      }
    }
  }
}
// [END tpu_v2alpha1_tpu_acceleratortypes_list]
