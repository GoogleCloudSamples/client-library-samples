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

// [START gkehub_v1beta1_gkehubmembershipservice_generate_connect_manifest]
import com.google.cloud.gkehub.v1beta1.ConnectAgentResource;
import com.google.cloud.gkehub.v1beta1.GenerateConnectManifestRequest;
import com.google.cloud.gkehub.v1beta1.GenerateConnectManifestResponse;
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;

public class GenerateConnectManifest {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String membershipId = "example-membership_id";
    generateConnectManifest(projectId, locationId, membershipId);
  }

  public static void generateConnectManifest(
      String projectId, String locationId, String membershipId) throws Exception {
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/memberships/%s", projectId, locationId, membershipId);

      GenerateConnectManifestRequest request =
          GenerateConnectManifestRequest.newBuilder()
              .setName(name)
              .build();

      GenerateConnectManifestResponse response = client.generateConnectManifest(request);
      for (ConnectAgentResource resource : response.getManifestList()) {
        System.out.println("Manifest: " + resource.getManifest());
      }
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_generate_connect_manifest]
