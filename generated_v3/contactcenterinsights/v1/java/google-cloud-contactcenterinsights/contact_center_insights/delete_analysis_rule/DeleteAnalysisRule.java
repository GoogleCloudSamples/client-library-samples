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

// [START contactcenterinsights_v1_contactcenterinsights_analysisrule_delete]
import com.google.cloud.contactcenterinsights.v1.AnalysisRuleName;
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import java.io.IOException;

public class DeleteAnalysisRule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String analysisRuleId = "example-analysis_rule_id";
    deleteAnalysisRule(projectId, locationId, analysisRuleId);
  }

  public static void deleteAnalysisRule(String projectId, String locationId, String analysisRuleId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String name = AnalysisRuleName.of(projectId, locationId, analysisRuleId).toString();
      client.deleteAnalysisRule(name);
      System.out.println("Deleted analysis rule: " + name);
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_analysisrule_delete]
