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

// [START dlp_v2_dlpservice_inspecttemplate_delete]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.DeleteInspectTemplateRequest;
import java.io.IOException;

public class DeleteInspectTemplate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String inspectTemplateId = "example-inspect_template_id";
    deleteInspectTemplate(projectId, locationId, inspectTemplateId);
  }

  public static void deleteInspectTemplate(
      String projectId, String locationId, String inspectTemplateId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/inspectTemplates/%s",
              projectId, locationId, inspectTemplateId);

      DeleteInspectTemplateRequest request =
          DeleteInspectTemplateRequest.newBuilder().setName(name).build();

      client.deleteInspectTemplate(request);
      System.out.printf("Deleted inspect template: %s%n", name);
    }
  }
}
// [END dlp_v2_dlpservice_inspecttemplate_delete]
