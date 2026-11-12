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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_inspect_content]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.ContentItem;
import com.google.privacy.dlp.v2.Finding;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.InspectContentRequest;
import com.google.privacy.dlp.v2.InspectContentResponse;
import com.google.privacy.dlp.v2.Likelihood;
import com.google.privacy.dlp.v2.ProjectName;

public class InspectContent {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    inspectContent(projectId);
  }

  public static void inspectContent(String projectId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      InfoType phoneInfoType = InfoType.newBuilder().setName("PHONE_NUMBER").build();
      InfoType emailInfoType = InfoType.newBuilder().setName("EMAIL_ADDRESS").build();

      InspectConfig inspectConfig =
          InspectConfig.newBuilder()
              .addInfoTypes(phoneInfoType)
              .addInfoTypes(emailInfoType)
              .setMinLikelihood(Likelihood.LIKELY)
              .setIncludeQuote(true)
              .build();

      ContentItem item =
          ContentItem.newBuilder()
              .setValue("My phone number is 206-555-0123 and email is test@example.com")
              .build();

      InspectContentRequest request =
          InspectContentRequest.newBuilder()
              .setParent(ProjectName.of(projectId).toString())
              .setInspectConfig(inspectConfig)
              .setItem(item)
              .build();

      InspectContentResponse response = client.inspectContent(request);

      System.out.println("Findings found: " + response.getResult().getFindingsCount());
      for (Finding finding : response.getResult().getFindingsList()) {
        System.out.println("Info type: " + finding.getInfoType().getName());
        System.out.println("Quote: " + finding.getQuote());
        System.out.println("Likelihood: " + finding.getLikelihood());
      }
    }
  }
}
// [END dlp_v2_dlpservice_inspect_content]
