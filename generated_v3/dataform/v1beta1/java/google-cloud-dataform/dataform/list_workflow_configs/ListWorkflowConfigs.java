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

package com.google.cloud.dataform.v1beta1;

// [START dataform_v1beta1_dataform_workflowconfigs_list]
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.RepositoryName;
import com.google.cloud.dataform.v1beta1.WorkflowConfig;

public class ListWorkflowConfigs {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    listWorkflowConfigs(projectId, locationId, repositoryId);
  }

  public static void listWorkflowConfigs(String projectId, String locationId, String repositoryId)
      throws Exception {
    try (DataformClient client = DataformClient.create()) {
      String parent = RepositoryName.of(projectId, locationId, repositoryId).toString();

      for (WorkflowConfig workflowConfig : client.listWorkflowConfigs(parent).iterateAll()) {
        System.out.println("Workflow config name: " + workflowConfig.getName());
      }
    }
  }
}
// [END dataform_v1beta1_dataform_workflowconfigs_list]
