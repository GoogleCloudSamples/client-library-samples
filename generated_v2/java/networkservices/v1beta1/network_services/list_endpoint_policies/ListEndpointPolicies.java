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

package com.google.cloud.networkservices.v1beta1;

// [START networkservices_v1beta1_networkservices_endpointpolicies_list]
import com.google.cloud.networkservices.v1.EndpointPolicy;
import com.google.cloud.networkservices.v1.NetworkServicesClient;

public class ListEndpointPolicies {

  public static void main(String[] args) throws Exception {
    String projectId = args.length > 0 ? args[0] : System.getenv("GOOGLE_CLOUD_PROJECT");
    if (projectId != null && !projectId.isEmpty()) {
      listEndpointPolicies(projectId);
    }
  }

  public static void listEndpointPolicies(String projectId) throws Exception {
    // Initialize the client that manages network services configurations using Application Default Credentials
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String location = "global";
      String parent = String.format("projects/%s/locations/%s", projectId, location);

      for (EndpointPolicy endpointPolicy : client.listEndpointPolicies(parent).iterateAll()) {
        System.out.println("Endpoint policy name: " + endpointPolicy.getName());
      }
    }
  }
}
// [END networkservices_v1beta1_networkservices_endpointpolicies_list]
