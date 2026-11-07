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

// [START contactcenterinsights_v1_contactcenterinsights_analysisrule_update]
import com.google.cloud.contactcenterinsights.v1.AnalysisRule;
import com.google.cloud.contactcenterinsights.v1.AnalysisRuleName;
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateAnalysisRule {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String analysisRuleId = "example-analysis_rule_id";
    updateAnalysisRule(projectId, locationId, analysisRuleId);
  }

  public static void updateAnalysisRule(String projectId, String locationId, String analysisRuleId)
      throws IOException {
    // Initialize client that will be used to send requests.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      AnalysisRule analysisRule =
          AnalysisRule.newBuilder()
              .setName(AnalysisRuleName.of(projectId, locationId, analysisRuleId).toString())
              .setDisplayName("Updated Analysis Rule")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      AnalysisRule response = client.updateAnalysisRule(analysisRule, updateMask);
      System.out.println("Updated analysis rule: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_analysisrule_update]
