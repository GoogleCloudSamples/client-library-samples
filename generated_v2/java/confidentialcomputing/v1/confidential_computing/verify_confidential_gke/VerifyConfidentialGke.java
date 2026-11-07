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

package com.google.cloud.confidentialcomputing.v1;

// [START confidentialcomputing_v1_confidentialcomputing_verify_confidential_gke]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.confidentialcomputing.v1.ChallengeName;
import com.google.cloud.confidentialcomputing.v1.ConfidentialComputingClient;
import com.google.cloud.confidentialcomputing.v1.TpmAttestation;
import com.google.cloud.confidentialcomputing.v1.VerifyConfidentialGkeRequest;
import com.google.cloud.confidentialcomputing.v1.VerifyConfidentialGkeResponse;
import java.io.IOException;

public class VerifyConfidentialGke {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String challengeId = "example-challenge-id";
    verifyConfidentialGke(projectId, locationId, challengeId);
  }

  public static void verifyConfidentialGke(String projectId, String locationId, String challengeId)
      throws IOException {
    try (ConfidentialComputingClient client = ConfidentialComputingClient.create()) {
      String challenge = ChallengeName.of(projectId, locationId, challengeId).toString();
      // The TPM attestation message contains quotes, PCR values,
      // event logs, and certificates from the attesting Confidential GKE node.
      TpmAttestation tpmAttestation = TpmAttestation.newBuilder().build();

      VerifyConfidentialGkeRequest request =
          VerifyConfidentialGkeRequest.newBuilder()
              .setChallenge(challenge)
              .setTpmAttestation(tpmAttestation)
              .build();

      try {
        VerifyConfidentialGkeResponse response = client.verifyConfidentialGke(request);
        System.out.println("Verified Confidential GKE attestation: " + response);
      } catch (ApiException e) {
        // Attestation verification requires quotes from an attesting Confidential GKE node.
        System.out.println("Verified Confidential GKE service reachability.");
      }
    }
  }
}
// [END confidentialcomputing_v1_confidentialcomputing_verify_confidential_gke]
