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

package com.google.cloud.osconfig.v1beta;

// [START osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]
import com.google.cloud.osconfig.v1beta.GuestPolicies.EffectiveGuestPolicy;
import com.google.cloud.osconfig.v1beta.GuestPolicies.LookupEffectiveGuestPolicyRequest;
import com.google.cloud.osconfig.v1beta.OsConfigServiceClient;
import java.io.IOException;

public class LookupEffectiveGuestPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String zoneId = "example-zone-id";
    String instanceId = "example-instance-id";
    lookupEffectiveGuestPolicy(projectId, zoneId, instanceId);
  }

  public static void lookupEffectiveGuestPolicy(String projectId, String zoneId, String instanceId)
      throws IOException {
    // Initialize the client that will be used to send requests.
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String instance =
          String.format("projects/%s/zones/%s/instances/%s", projectId, zoneId, instanceId);

      LookupEffectiveGuestPolicyRequest request =
          LookupEffectiveGuestPolicyRequest.newBuilder()
              .setInstance(instance)
              .build();

      EffectiveGuestPolicy response = client.lookupEffectiveGuestPolicy(request);

      System.out.println("Retrieved effective guest policy for: " + instance);
      System.out.println("Packages count: " + response.getPackagesCount());
      System.out.println("Package repositories count: " + response.getPackageRepositoriesCount());
      System.out.println("Software recipes count: " + response.getSoftwareRecipesCount());
    }
  }
}
// [END osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]
