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

package com.google.cloud.managedidentities.v1;

// [START managedidentities_v1_managedidentitiesservice_reset_admin_password]
import com.google.cloud.managedidentities.v1.ManagedIdentitiesServiceClient;
import com.google.cloud.managedidentities.v1.ResetAdminPasswordRequest;
import com.google.cloud.managedidentities.v1.ResetAdminPasswordResponse;

public class ResetAdminPassword {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String domainId = "example-domain.com";
    resetAdminPassword(projectId, domainId);
  }

  public static void resetAdminPassword(String projectId, String domainId) throws Exception {
    try (ManagedIdentitiesServiceClient client = ManagedIdentitiesServiceClient.create()) {
      String name = String.format("projects/%s/locations/global/domains/%s", projectId, domainId);

      ResetAdminPasswordRequest request =
          ResetAdminPasswordRequest.newBuilder()
              .setName(name)
              .build();

      ResetAdminPasswordResponse response = client.resetAdminPassword(request);
      System.out.printf("Administrator password reset: %s%n", response.getPassword());
    }
  }
}
// [END managedidentities_v1_managedidentitiesservice_reset_admin_password]
