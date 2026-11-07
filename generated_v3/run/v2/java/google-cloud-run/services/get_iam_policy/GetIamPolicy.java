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

package com.google.cloud.run.v2;

// [START run_v2_services_iampolicy_get]
import com.google.cloud.run.v2.ServiceName;
import com.google.cloud.run.v2.ServicesClient;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;

public class GetIamPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String serviceId = "example-service-id";
    getIamPolicy(projectId, locationId, serviceId);
  }

  public static void getIamPolicy(String projectId, String locationId, String serviceId)
      throws Exception {
    try (ServicesClient client = ServicesClient.create()) {
      String resource = ServiceName.of(projectId, locationId, serviceId).toString();
      GetIamPolicyRequest request =
          GetIamPolicyRequest.newBuilder().setResource(resource).build();

      Policy response = client.getIamPolicy(request);
      System.out.println("Retrieved IAM policy for: " + resource);
      System.out.println("Policy version: " + response.getVersion());
      System.out.println("Bindings count: " + response.getBindingsCount());
    }
  }
}
// [END run_v2_services_iampolicy_get]
