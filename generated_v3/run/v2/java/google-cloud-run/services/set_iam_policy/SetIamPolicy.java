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

// [START run_v2_services_set_iam_policy]
import com.google.cloud.run.v2.ServiceName;
import com.google.cloud.run.v2.ServicesClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class SetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    setIamPolicy(projectId, locationId, serviceId);
  }

  public static void setIamPolicy(String projectId, String locationId, String serviceId)
      throws IOException {
    try (ServicesClient client = ServicesClient.create()) {
      String resource = ServiceName.of(projectId, locationId, serviceId).toString();
      Policy policy =
          Policy.newBuilder()
              .addBindings(
                  Binding.newBuilder()
                      .setRole("roles/run.invoker")
                      .addMembers(
                          String.format(
                              "serviceAccount:example-invoker@%s.iam.gserviceaccount.com",
                              projectId))
                      .build())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("bindings").build();

      SetIamPolicyRequest request =
          SetIamPolicyRequest.newBuilder()
              .setResource(resource)
              .setPolicy(policy)
              .setUpdateMask(updateMask)
              .build();

      Policy updatedPolicy = client.setIamPolicy(request);
      System.out.printf("Set IAM policy successfully for resource: %s%n", resource);
      for (Binding binding : updatedPolicy.getBindingsList()) {
        System.out.printf("Role: %s, Members: %s%n", binding.getRole(), binding.getMembersList());
      }
    }
  }
}
// [END run_v2_services_set_iam_policy]
