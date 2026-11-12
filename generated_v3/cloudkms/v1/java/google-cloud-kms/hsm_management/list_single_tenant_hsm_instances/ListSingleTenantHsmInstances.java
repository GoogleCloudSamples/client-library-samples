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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
import com.google.cloud.kms.v1.HsmManagementClient;
import com.google.cloud.kms.v1.SingleTenantHsmInstance;
import java.io.IOException;

public class ListSingleTenantHsmInstances {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listSingleTenantHsmInstances(projectId, locationId);
  }

  public static void listSingleTenantHsmInstances(String projectId, String locationId)
      throws IOException {
    try (HsmManagementClient client = HsmManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (SingleTenantHsmInstance instance :
          client.listSingleTenantHsmInstances(parent).iterateAll()) {
        System.out.printf("Single-Tenant HSM instance: %s%n", instance.getName());
      }
    }
  }
}
// [END cloudkms_v1_hsmmanagement_singletenanthsminstances_list]
