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

// [START contactcenterinsights_v1_contactcenterinsights_qascorecardrevisions_list]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.ListQaScorecardRevisionsRequest;
import com.google.cloud.contactcenterinsights.v1.QaScorecardName;
import com.google.cloud.contactcenterinsights.v1.QaScorecardRevision;

public class ListQaScorecardRevisions {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String qaScorecardId = "example-qa_scorecard_id";
    listQaScorecardRevisions(projectId, locationId, qaScorecardId);
  }

  public static void listQaScorecardRevisions(
      String projectId, String locationId, String qaScorecardId) throws Exception {
    // Initialize client that will be automatically closed after use.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = QaScorecardName.of(projectId, locationId, qaScorecardId).toString();
      ListQaScorecardRevisionsRequest request =
          ListQaScorecardRevisionsRequest.newBuilder().setParent(parent).build();

      for (QaScorecardRevision revision : client.listQaScorecardRevisions(request).iterateAll()) {
        System.out.println("Revision Name: " + revision.getName());
      }
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qascorecardrevisions_list]
