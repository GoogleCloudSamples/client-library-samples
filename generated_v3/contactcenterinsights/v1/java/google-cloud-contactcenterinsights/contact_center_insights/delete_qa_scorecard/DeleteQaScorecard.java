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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecard_delete]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.DeleteQaScorecardRequest;
import com.google.cloud.contactcenterinsights.v1.QaScorecardName;
import java.io.IOException;

public class DeleteQaScorecard {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String qaScorecardId = "example-qa-scorecard-id";
    boolean force = true;
    deleteQaScorecard(projectId, locationId, qaScorecardId, force);
  }

  public static void deleteQaScorecard(
      String projectId, String locationId, String qaScorecardId, boolean force) throws IOException {
    // Initialize client that will be automatically closed at the end of the try block.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String name = QaScorecardName.of(projectId, locationId, qaScorecardId).toString();

      DeleteQaScorecardRequest request =
          DeleteQaScorecardRequest.newBuilder()
              .setName(name)
              .setForce(force)
              .build();

      client.deleteQaScorecard(request);
      System.out.printf("Deleted QA scorecard: %s%n", name);
    }
  }

  public static void deleteQaScorecard(
      String projectId, String locationId, String qaScorecardId, String force) throws IOException {
    deleteQaScorecard(projectId, locationId, qaScorecardId, Boolean.parseBoolean(force));
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qascorecard_delete]
