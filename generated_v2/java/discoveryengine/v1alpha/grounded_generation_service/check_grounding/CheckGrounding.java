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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
import com.google.cloud.discoveryengine.v1alpha.CheckGroundingRequest;
import com.google.cloud.discoveryengine.v1alpha.CheckGroundingResponse;
import com.google.cloud.discoveryengine.v1alpha.GroundedGenerationServiceClient;
import com.google.cloud.discoveryengine.v1alpha.GroundingConfigName;
import com.google.cloud.discoveryengine.v1alpha.GroundingFact;
import java.io.IOException;

public class CheckGrounding {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String groundingConfigId = "example-grounding_config_id";
    checkGrounding(projectId, locationId, groundingConfigId);
  }

  public static void checkGrounding(String projectId, String locationId, String groundingConfigId)
      throws Exception {
    try (GroundedGenerationServiceClient client = GroundedGenerationServiceClient.create()) {
      String groundingConfig =
          GroundingConfigName.of(projectId, locationId, groundingConfigId).toString();

      GroundingFact fact =
          GroundingFact.newBuilder()
              .setFactText(
                  "Google was founded on September 4, 1998, by Larry Page and Sergey Brin.")
              .build();

      CheckGroundingRequest request =
          CheckGroundingRequest.newBuilder()
              .setGroundingConfig(groundingConfig)
              .setAnswerCandidate(
                  "Google was founded in September 1998 by Larry Page and Sergey Brin.")
              .addFacts(fact)
              .build();

      CheckGroundingResponse response = client.checkGrounding(request);
      System.out.println("Support score: " + response.getSupportScore());
      System.out.println("Cited chunks count: " + response.getCitedChunksCount());
      System.out.println("Claims count: " + response.getClaimsCount());
    }
  }
}
// [END discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
