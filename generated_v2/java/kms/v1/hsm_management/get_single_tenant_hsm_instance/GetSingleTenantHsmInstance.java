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

// [START cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
import com.google.cloud.kms.v1.HsmManagementClient;
import com.google.cloud.kms.v1.SingleTenantHsmInstance;
import java.io.IOException;

public class GetSingleTenantHsmInstance {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String singleTenantHsmInstanceId = "example-single-tenant-hsm-instance-id";
    getSingleTenantHsmInstance(projectId, locationId, singleTenantHsmInstanceId);
  }

  public static void getSingleTenantHsmInstance(
      String projectId, String locationId, String singleTenantHsmInstanceId) throws IOException {
    // Initialize client that sends requests. Create the client once and reuse it across requests.
    try (HsmManagementClient client = HsmManagementClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/singleTenantHsmInstances/%s",
              projectId, locationId, singleTenantHsmInstanceId);

      SingleTenantHsmInstance singleTenantHsmInstance = client.getSingleTenantHsmInstance(name);
      System.out.println(
          "Retrieved single-tenant HSM instance: " + singleTenantHsmInstance.getName());
    }
  }
}
// [END cloudkms_v1_hsmmanagement_singletenanthsminstance_get]
