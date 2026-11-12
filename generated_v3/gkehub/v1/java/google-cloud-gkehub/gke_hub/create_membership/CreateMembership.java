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

package com.google.cloud.gkehub.v1;

// [START gkehub_v1_gkehub_membership_create]
import com.google.cloud.gkehub.v1.GkeHubClient;
import com.google.cloud.gkehub.v1.Membership;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateMembership {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "global";
    String membershipId = "example-membership-id";
    createMembership(projectId, locationId, membershipId);
  }

  public static void createMembership(String projectId, String locationId, String membershipId)
      throws IOException, ExecutionException, InterruptedException {
    try (GkeHubClient client = GkeHubClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Membership resource =
          Membership.newBuilder()
              .putLabels("environment", "production")
              .build();

      Membership response =
          client.createMembershipAsync(parent, resource, membershipId).get();
      System.out.println("Created membership: " + response.getName());
    }
  }
}
// [END gkehub_v1_gkehub_membership_create]
