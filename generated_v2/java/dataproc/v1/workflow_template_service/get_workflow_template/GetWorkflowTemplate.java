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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_get]
import com.google.cloud.dataproc.v1.WorkflowTemplate;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceClient;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceSettings;
import java.io.IOException;

public class GetWorkflowTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String workflowTemplateId = "example-workflow-template-id";
    getWorkflowTemplate(projectId, locationId, workflowTemplateId);
  }

  public static void getWorkflowTemplate(
      String projectId, String locationId, String workflowTemplateId) throws IOException {
    String endpoint =
        "global".equalsIgnoreCase(locationId)
            ? "dataproc.googleapis.com:443"
            : String.format("%s-dataproc.googleapis.com:443", locationId);

    WorkflowTemplateServiceSettings settings =
        WorkflowTemplateServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (WorkflowTemplateServiceClient client = WorkflowTemplateServiceClient.create(settings)) {
      String name =
          String.format(
              "projects/%s/locations/%s/workflowTemplates/%s",
              projectId, locationId, workflowTemplateId);
      WorkflowTemplate response = client.getWorkflowTemplate(name);
      System.out.println("Retrieved workflow template: " + response.getName());
    }
  }
}
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_get]
