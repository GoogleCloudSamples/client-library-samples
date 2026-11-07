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

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.CreateQaScorecardRequest;
import com.google.cloud.contactcenterinsights.v1.LocationName;
import com.google.cloud.contactcenterinsights.v1.QaScorecard;

public class CreateQaScorecard {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String qaScorecardId = "example-qa_scorecard_id";
    createQaScorecard(projectId, locationId, qaScorecardId);
  }

  public static void createQaScorecard(String projectId, String locationId, String qaScorecardId)
      throws Exception {
    // Initialize client using Application Default Credentials
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      QaScorecard qaScorecard =
          QaScorecard.newBuilder()
              .setDisplayName("Agent Evaluation Scorecard")
              .setDescription("Scorecard for evaluating agent customer service performance")
              .build();

      CreateQaScorecardRequest request =
          CreateQaScorecardRequest.newBuilder()
              .setParent(parent)
              .setQaScorecard(qaScorecard)
              .setQaScorecardId(qaScorecardId)
              .build();

      QaScorecard response = client.createQaScorecard(request);
      System.out.println("Created QA scorecard: " + response.getName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_create]
