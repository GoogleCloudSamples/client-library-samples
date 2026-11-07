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

package com.google.cloud.dataproc.v1;

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_update]
import com.google.cloud.dataproc.v1.WorkflowTemplate;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceClient;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceSettings;
import java.io.IOException;

public class UpdateWorkflowTemplate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workflowTemplateId = "example-workflow-template-id";
    updateWorkflowTemplate(projectId, locationId, workflowTemplateId);
  }

  public static void updateWorkflowTemplate(
      String projectId, String locationId, String workflowTemplateId) throws Exception {
    String endpoint =
        "global".equalsIgnoreCase(locationId)
            ? "dataproc.googleapis.com:443"
            : String.format("%s-dataproc.googleapis.com:443", locationId);
    WorkflowTemplateServiceSettings settings =
        WorkflowTemplateServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (WorkflowTemplateServiceClient client = WorkflowTemplateServiceClient.create(settings)) {
      String templateName =
          String.format(
              "projects/%s/locations/%s/workflowTemplates/%s",
              projectId, locationId, workflowTemplateId);

      // Retrieve the existing template to obtain the current server version.
      WorkflowTemplate existingTemplate = client.getWorkflowTemplate(templateName);

      // Modify mutable fields while preserving the existing version number.
      WorkflowTemplate template =
          existingTemplate.toBuilder()
              .putLabels("updated", "true")
              .build();

      WorkflowTemplate updatedTemplate = client.updateWorkflowTemplate(template);
      System.out.printf("Updated workflow template: %s%n", updatedTemplate.getName());
      System.out.printf("Current version: %d%n", updatedTemplate.getVersion());
    }
  }
}
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_update]
