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

// [START contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
import com.google.cloud.contactcenterinsights.v1.AnalysisRule;
import com.google.cloud.contactcenterinsights.v1.AnnotatorSelector;
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.LocationName;
import java.io.IOException;

public class CreateAnalysisRule {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    createAnalysisRule(projectId, locationId);
  }

  public static void createAnalysisRule(String projectId, String locationId) throws IOException {
    // Initialize the client once; reuse it across multiple requests.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      AnnotatorSelector annotatorSelector =
          AnnotatorSelector.newBuilder()
              .setRunSentimentAnnotator(true)
              .build();

      AnalysisRule analysisRule =
          AnalysisRule.newBuilder()
              .setDisplayName("example-analysis-rule")
              .setAnnotatorSelector(annotatorSelector)
              .setAnalysisPercentage(1.0)
              .setActive(true)
              .build();

      AnalysisRule response = client.createAnalysisRule(parent, analysisRule);
      System.out.println("Created analysis rule: " + response.getName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_analysisrule_create]
