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

// [START gkehub_v1beta1_gkehubmembershipservice_generate_exclusivity_manifest]
import com.google.cloud.gkehub.v1beta1.GenerateExclusivityManifestRequest;
import com.google.cloud.gkehub.v1beta1.GenerateExclusivityManifestResponse;
import com.google.cloud.gkehub.v1beta1.GkeHubMembershipServiceClient;
import com.google.cloud.gkehub.v1beta1.MembershipName;
import java.io.IOException;

public class GenerateExclusivityManifest {

  public static void main(String[] args) throws IOException {
    if (args.length >= 3) {
      String projectId = args[0];
      String locationId = args[1];
      String membershipId = args[2];
      generateExclusivityManifest(projectId, locationId, membershipId);
    }
  }

  public static void generateExclusivityManifest(
      String projectId, String locationId, String membershipId) throws IOException {
    // Initialize the client with Application Default Credentials.
    try (GkeHubMembershipServiceClient client = GkeHubMembershipServiceClient.create()) {
      String name = MembershipName.of(projectId, locationId, membershipId).toString();

      GenerateExclusivityManifestRequest request =
          GenerateExclusivityManifestRequest.newBuilder()
              .setName(name)
              .build();

      GenerateExclusivityManifestResponse response = client.generateExclusivityManifest(request);

      System.out.println("CRD Manifest: " + response.getCrdManifest());
      System.out.println("CR Manifest: " + response.getCrManifest());
    }
  }
}
// [END gkehub_v1beta1_gkehubmembershipservice_generate_exclusivity_manifest]
