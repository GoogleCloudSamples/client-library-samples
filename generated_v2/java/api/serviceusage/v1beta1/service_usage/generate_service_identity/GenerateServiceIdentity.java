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

package com.google.cloud.serviceusage.v1beta1;

// [START serviceusage_v1beta1_serviceusage_generate_service_identity]
import com.google.api.serviceusage.v1beta1.GenerateServiceIdentityRequest;
import com.google.api.serviceusage.v1beta1.ServiceIdentity;
import com.google.api.serviceusage.v1beta1.ServiceUsageClient;
import java.util.concurrent.TimeUnit;

public class GenerateServiceIdentity {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String serviceId = "example-service-id";
    generateServiceIdentity(projectId, serviceId);
  }

  public static void generateServiceIdentity(String projectId, String serviceId) throws Exception {
    try (ServiceUsageClient client = ServiceUsageClient.create()) {
      String parent = String.format("projects/%s/services/%s", projectId, serviceId);
      GenerateServiceIdentityRequest request =
          GenerateServiceIdentityRequest.newBuilder().setParent(parent).build();

      // GenerateServiceIdentity is a long-running operation; wait for it to complete.
      ServiceIdentity serviceIdentity =
          client.generateServiceIdentityAsync(request).get(3, TimeUnit.MINUTES);

      System.out.println("Generated service identity email: " + serviceIdentity.getEmail());
    }
  }
}
// [END serviceusage_v1beta1_serviceusage_generate_service_identity]
