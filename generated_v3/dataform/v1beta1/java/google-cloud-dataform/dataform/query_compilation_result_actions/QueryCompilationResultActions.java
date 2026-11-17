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

// [START dataform_v1beta1_dataform_query_compilation_result_actions]
import com.google.cloud.dataform.v1beta1.CompilationResultAction;
import com.google.cloud.dataform.v1beta1.CompilationResultName;
import com.google.cloud.dataform.v1beta1.DataformClient;
import com.google.cloud.dataform.v1beta1.QueryCompilationResultActionsRequest;

public class QueryCompilationResultActions {

  public static void main(String[] args) throws Exception {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String repositoryId = "example-repository-id";
    String compilationResultId = "example-compilation-result-id";
    queryCompilationResultActions(projectId, locationId, repositoryId, compilationResultId);
  }

  public static void queryCompilationResultActions(
      String projectId, String locationId, String repositoryId, String compilationResultId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DataformClient client = DataformClient.create()) {
      String name =
          CompilationResultName.of(projectId, locationId, repositoryId, compilationResultId)
              .toString();

      QueryCompilationResultActionsRequest request =
          QueryCompilationResultActionsRequest.newBuilder().setName(name).build();

      for (CompilationResultAction action :
          client.queryCompilationResultActions(request).iterateAll()) {
        System.out.println("Target: " + action.getTarget().getName());
        System.out.println("File path: " + action.getFilePath());
      }
    }
  }
}
// [END dataform_v1beta1_dataform_query_compilation_result_actions]
