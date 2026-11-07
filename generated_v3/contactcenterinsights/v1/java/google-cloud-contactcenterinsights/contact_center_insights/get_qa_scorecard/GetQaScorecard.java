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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_get]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.GetQaScorecardRequest;
import com.google.cloud.contactcenterinsights.v1.QaScorecard;
import com.google.cloud.contactcenterinsights.v1.QaScorecardName;

public class GetQaScorecard {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String qaScorecardId = "example-qa_scorecard_id";
    getQaScorecard(projectId, locationId, qaScorecardId);
  }

  public static void getQaScorecard(String projectId, String locationId, String qaScorecardId)
      throws Exception {
    // Initialize the client. Using try-with-resources ensures the client closes automatically.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String name = QaScorecardName.of(projectId, locationId, qaScorecardId).toString();
      GetQaScorecardRequest request = GetQaScorecardRequest.newBuilder().setName(name).build();

      QaScorecard response = client.getQaScorecard(request);
      System.out.println("QA Scorecard name: " + response.getName());
      System.out.println("QA Scorecard display name: " + response.getDisplayName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_get]
