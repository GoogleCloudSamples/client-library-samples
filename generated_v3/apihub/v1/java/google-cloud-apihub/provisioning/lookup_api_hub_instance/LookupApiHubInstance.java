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

package com.google.cloud.apihub.v1;

// [START apihub_v1_provisioning_lookup_api_hub_instance]
import com.google.cloud.apihub.v1.ApiHubInstance;
import com.google.cloud.apihub.v1.LookupApiHubInstanceRequest;
import com.google.cloud.apihub.v1.LookupApiHubInstanceResponse;
import com.google.cloud.apihub.v1.ProvisioningClient;

public class LookupApiHubInstance {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    lookupApiHubInstance(projectId, locationId);
  }

  public static void lookupApiHubInstance(String projectId, String locationId) throws Exception {
    // Initialize the client using Application Default Credentials.
    try (ProvisioningClient client = ProvisioningClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      LookupApiHubInstanceRequest request =
          LookupApiHubInstanceRequest.newBuilder().setParent(parent).build();

      LookupApiHubInstanceResponse response = client.lookupApiHubInstance(request);

      if (response.hasApiHubInstance()) {
        ApiHubInstance apiHubInstance = response.getApiHubInstance();
        System.out.println("API Hub instance: " + apiHubInstance.getName());
        System.out.println("State: " + apiHubInstance.getState());
      } else {
        System.out.println("No API Hub instance found in the specified location.");
      }
    }
  }
}
// [END apihub_v1_provisioning_lookup_api_hub_instance]
