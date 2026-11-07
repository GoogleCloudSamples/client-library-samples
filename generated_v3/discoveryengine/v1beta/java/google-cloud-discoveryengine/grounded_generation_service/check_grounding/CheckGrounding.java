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

package com.google.cloud.discoveryengine.v1beta;

// [START discoveryengine_v1beta_groundedgenerationservice_check_grounding]
import com.google.cloud.discoveryengine.v1beta.CheckGroundingRequest;
import com.google.cloud.discoveryengine.v1beta.CheckGroundingResponse;
import com.google.cloud.discoveryengine.v1beta.GroundedGenerationServiceClient;
import com.google.cloud.discoveryengine.v1beta.GroundingFact;
import java.io.IOException;

public class CheckGrounding {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String groundingConfigId = "default_grounding_config";
    checkGrounding(projectId, locationId, groundingConfigId);
  }

  public static void checkGrounding(String projectId, String locationId, String groundingConfigId)
      throws Exception {
    try (GroundedGenerationServiceClient client = GroundedGenerationServiceClient.create()) {
      String groundingConfig =
          String.format(
              "projects/%s/locations/%s/groundingConfigs/%s",
              projectId, locationId, groundingConfigId);

      CheckGroundingRequest request =
          CheckGroundingRequest.newBuilder()
              .setGroundingConfig(groundingConfig)
              .setAnswerCandidate("Rayleigh scattering causes the sky to appear blue.")
              .addFacts(
                  GroundingFact.newBuilder()
                      .setFactText(
                          "Rayleigh scattering off the molecules of the air gives us the blue sky.")
                      .build())
              .build();

      CheckGroundingResponse response = client.checkGrounding(request);

      System.out.println("Support score: " + response.getSupportScore());
      System.out.println("Response details: " + response);
    }
  }
}
// [END discoveryengine_v1beta_groundedgenerationservice_check_grounding]
