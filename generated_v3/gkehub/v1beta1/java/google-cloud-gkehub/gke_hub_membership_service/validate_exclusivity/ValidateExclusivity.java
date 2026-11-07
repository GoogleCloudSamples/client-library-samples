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

package com.google.cloud.gkehub.v1beta1;

// [START gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.ValidateExclusivityRequest;
import com.google.cloud.gkehub.v1beta1.ValidateExclusivityResponse;
import java.io.IOException;

public class ValidateExclusivity {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String intendedMembership = "example-intended-membership";
    validateExclusivity(projectId, locationId, intendedMembership);
  }

  public static void validateExclusivity(
      String projectId, String locationId, String intendedMembership) throws IOException {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // Validate exclusivity for the intended membership against the parent resource.
      ValidateExclusivityRequest request =
          ValidateExclusivityRequest.newBuilder()
              .setParent(parent)
              .setIntendedMembership(intendedMembership)
              .build();

      ValidateExclusivityResponse response = client.validateExclusivity(request);
      System.out.println("Validation status code: " + response.getStatus().getCode());
      System.out.println("Validation status message: " + response.getStatus().getMessage());
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
