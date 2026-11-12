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

package com.google.cloud.confidentialcomputing.v1alpha1;

// [START confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]
import com.google.cloud.confidentialcomputing.v1alpha1.Challenge;
import com.google.cloud.confidentialcomputing.v1alpha1.ConfidentialComputingClient;
import java.io.IOException;

public class CreateChallenge {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createChallenge(projectId, locationId);
  }

  public static void createChallenge(String projectId, String locationId) throws Exception {
    try (ConfidentialComputingClient client = ConfidentialComputingClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Challenge challenge = Challenge.newBuilder().build();

      Challenge response = client.createChallenge(parent, challenge);
      System.out.println("Created challenge: " + response.getName());
    }
  }
}
// [END confidentialcomputing_v1alpha1_confidentialcomputing_challenge_create]
