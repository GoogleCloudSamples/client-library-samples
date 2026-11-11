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

package com.google.cloud.servicedirectory.v1;

// [START servicedirectory_v1_registrationservice_iampolicy_get]
import com.google.cloud.servicedirectory.v1.NamespaceName;
import com.google.cloud.servicedirectory.v1.RegistrationServiceClient;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String namespaceId = "example-namespace-id";
    getIamPolicy(projectId, locationId, namespaceId);
  }

  public static void getIamPolicy(String projectId, String locationId, String namespaceId)
      throws Exception {
    // Initialize the client with Application Default Credentials.
    try (RegistrationServiceClient client = RegistrationServiceClient.create()) {
      String resource = NamespaceName.of(projectId, locationId, namespaceId).toString();

      GetIamPolicyRequest request =
          GetIamPolicyRequest.newBuilder()
              .setResource(resource)
              .build();

      Policy policy = client.getIamPolicy(request);

      System.out.println("Retrieved IAM policy for resource: " + resource);
      System.out.println("IAM policy bindings: " + policy.getBindingsList());
    }
  }
}
// [END servicedirectory_v1_registrationservice_iampolicy_get]
