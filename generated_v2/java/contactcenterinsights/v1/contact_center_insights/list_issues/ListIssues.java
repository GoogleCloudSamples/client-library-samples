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

// [START contactcenterinsights_v1_contactcenterinsights_issues_list]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.Issue;
import com.google.cloud.contactcenterinsights.v1.IssueModelName;
import com.google.cloud.contactcenterinsights.v1.ListIssuesResponse;

public class ListIssues {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String issueModelId = "example-issue-model-id";
    listIssues(projectId, locationId, issueModelId);
  }

  public static void listIssues(String projectId, String locationId, String issueModelId)
      throws Exception {
    // Initialize the client. This client manages credentials and service connections.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = IssueModelName.of(projectId, locationId, issueModelId).toString();
      ListIssuesResponse response = client.listIssues(parent);

      for (Issue issue : response.getIssuesList()) {
        System.out.printf("Issue name: %s%n", issue.getName());
        System.out.printf("Display name: %s%n", issue.getDisplayName());
      }
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_issues_list]
