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

// [START dlp_v2_dlpservice_inspecttemplate_update]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.InspectTemplate;
import com.google.privacy.dlp.v2.UpdateInspectTemplateRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateInspectTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String inspectTemplateId = "example-inspect-template-id";
    updateInspectTemplate(projectId, locationId, inspectTemplateId);
  }

  public static void updateInspectTemplate(
      String projectId, String locationId, String inspectTemplateId) throws IOException {
    // Create client once and reuse across requests.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/inspectTemplates/%s",
              projectId, locationId, inspectTemplateId);

      // Specify updated configuration values for the template
      InspectTemplate inspectTemplate =
          InspectTemplate.newBuilder()
              .setDescription("Updated description for inspect template")
              .build();

      // Field mask controls which fields in the template are updated
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      UpdateInspectTemplateRequest request =
          UpdateInspectTemplateRequest.newBuilder()
              .setName(name)
              .setInspectTemplate(inspectTemplate)
              .setUpdateMask(updateMask)
              .build();

      InspectTemplate response = client.updateInspectTemplate(request);
      System.out.println("Updated inspect template: " + response.getName());
      System.out.println("Updated description: " + response.getDescription());
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_update]
