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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecards_list]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.ListQaScorecardsRequest;
import com.google.cloud.contactcenterinsights.v1.LocationName;
import com.google.cloud.contactcenterinsights.v1.QaScorecard;

public class ListQaScorecards {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listQaScorecards(projectId, locationId);
  }

  public static void listQaScorecards(String projectId, String locationId) throws Exception {
    // Initialize client within try-with-resources to ensure proper resource cleanup.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      ListQaScorecardsRequest request =
          ListQaScorecardsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (QaScorecard scorecard : client.listQaScorecards(request).iterateAll()) {
        System.out.println("Scorecard name: " + scorecard.getName());
        System.out.println("Scorecard display name: " + scorecard.getDisplayName());
      }
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qascorecards_list]
