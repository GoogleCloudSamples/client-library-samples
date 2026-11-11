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

// [START networkservices_v1_networkservices_servicelbpolicies_list]
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import com.google.cloud.networkservices.v1.ServiceLbPolicy;
import java.io.IOException;

public class ListServiceLbPolicies {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listServiceLbPolicies(projectId, locationId);
  }

  public static void listServiceLbPolicies(String projectId, String locationId) throws Exception {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (ServiceLbPolicy serviceLbPolicy : client.listServiceLbPolicies(parent).iterateAll()) {
        System.out.println("Service LB Policy: " + serviceLbPolicy.getName());
      }
    }
  }
}
// [END networkservices_v1_networkservices_servicelbpolicies_list]
