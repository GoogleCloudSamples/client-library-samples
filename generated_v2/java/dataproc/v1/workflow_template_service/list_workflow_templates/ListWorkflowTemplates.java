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

// [START dataproc_v1_workflowtemplateservice_workflowtemplates_list]
import com.google.cloud.dataproc.v1.WorkflowTemplate;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceClient;
import com.google.cloud.dataproc.v1.WorkflowTemplateServiceSettings;
import java.io.IOException;

public class ListWorkflowTemplates {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String regionId = "example-region-id";
    listWorkflowTemplates(projectId, regionId);
  }

  public static void listWorkflowTemplates(String projectId, String regionId) throws IOException {
    WorkflowTemplateServiceSettings settings =
        WorkflowTemplateServiceSettings.newBuilder()
            .setEndpoint(String.format("%s-dataproc.googleapis.com:443", regionId))
            .build();

    try (WorkflowTemplateServiceClient client = WorkflowTemplateServiceClient.create(settings)) {
      String parent = String.format("projects/%s/regions/%s", projectId, regionId);
      for (WorkflowTemplate template : client.listWorkflowTemplates(parent).iterateAll()) {
        System.out.println(template.getName());
      }
    }
  }
}
// [END dataproc_v1_workflowtemplateservice_workflowtemplates_list]
