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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
import com.google.cloud.dataproc.v1.WorkflowTemplateName;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceClient;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceSettings;
import java.io.IOException;

public class DeleteWorkflowTemplate {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String workflowTemplateId = "example-workflow_template_id";
    deleteWorkflowTemplate(projectId, locationId, workflowTemplateId);
  }

  public static void deleteWorkflowTemplate(
      String projectId, String locationId, String workflowTemplateId) throws Exception {
    // Configure regional endpoint for regional Dataproc services.
    String endpoint =
        "global".equalsIgnoreCase(locationId)
            ? "dataproc.googleapis.com:443"
            : String.format("%s-dataproc.googleapis.com:443", locationId);
    WorkflowTemplateServiceSettings settings =
        WorkflowTemplateServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (WorkflowTemplateServiceClient client = WorkflowTemplateServiceClient.create(settings)) {
      String name =
          WorkflowTemplateName.of(projectId, locationId, workflowTemplateId).toString();
      client.deleteWorkflowTemplate(name);
      System.out.printf("Workflow template deleted successfully: %s%n", name);
    }
  }
}
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
