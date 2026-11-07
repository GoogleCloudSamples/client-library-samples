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

// [START dlp_v2_dlpservice_inspecttemplate_create]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CreateInspectTemplateRequest;
import com.google.privacy.dlp.v2.InfoType;
import com.google.privacy.dlp.v2.InspectConfig;
import com.google.privacy.dlp.v2.InspectTemplate;
import com.google.privacy.dlp.v2.Likelihood;
import com.google.privacy.dlp.v2.LocationName;

public class CreateInspectTemplate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    createInspectTemplate(projectId, locationId);
  }

  public static void createInspectTemplate(String projectId, String locationId) throws Exception {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      // Build the parent resource identifier
      String parent = LocationName.of(projectId, locationId).toString();

      // Specify the types of sensitive data to detect
      InfoType infoType = InfoType.newBuilder().setName("EMAIL_ADDRESS").build();

      // Configure detection parameters
      InspectConfig inspectConfig =
          InspectConfig.newBuilder()
              .addInfoTypes(infoType)
              .setMinLikelihood(Likelihood.LIKELY)
              .setIncludeQuote(true)
              .build();

      // Assemble the template configuration
      InspectTemplate inspectTemplate =
          InspectTemplate.newBuilder()
              .setDisplayName("Sample Inspect Template")
              .setDescription("Created by API sample")
              .setInspectConfig(inspectConfig)
              .build();

      CreateInspectTemplateRequest request =
          CreateInspectTemplateRequest.newBuilder()
              .setParent(parent)
              .setInspectTemplate(inspectTemplate)
              .build();

      InspectTemplate response = client.createInspectTemplate(request);
      System.out.println("Inspect template created: " + response.getName());
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_create]
