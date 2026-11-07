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

package com.google.cloud.datamigration.v1;

// [START datamigration_v1_datamigrationservice_commit_conversion_workspace]
import com.google.cloud.clouddms.v1.CommitConversionWorkspaceRequest;
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.ConversionWorkspaceName;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CommitConversionWorkspace {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String conversionWorkspaceId = "example-conversion-workspace-id";
    commitConversionWorkspace(projectId, locationId, conversionWorkspaceId);
  }

  public static void commitConversionWorkspace(
      String projectId, String locationId, String conversionWorkspaceId)
      throws IOException, ExecutionException, InterruptedException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String name =
          ConversionWorkspaceName.of(projectId, locationId, conversionWorkspaceId).toString();
      CommitConversionWorkspaceRequest request =
          CommitConversionWorkspaceRequest.newBuilder().setName(name).build();

      // CommitConversionWorkspace is a long-running operation; wait for it to complete.
      ConversionWorkspace response = client.commitConversionWorkspaceAsync(request).get();
      System.out.println("Committed conversion workspace: " + response.getName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_commit_conversion_workspace]
