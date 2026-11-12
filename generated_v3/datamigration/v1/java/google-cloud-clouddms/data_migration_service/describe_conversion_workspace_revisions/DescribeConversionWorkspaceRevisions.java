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

// [START datamigration_v1_datamigrationservice_describe_conversion_workspace_revisions]
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.DescribeConversionWorkspaceRevisionsRequest;
import com.google.cloud.clouddms.v1.DescribeConversionWorkspaceRevisionsResponse;
import java.io.IOException;

public class DescribeConversionWorkspaceRevisions {

  public static void main(String[] args) throws IOException {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String conversionWorkspaceId = "example-conversion-workspace-id";

    describeConversionWorkspaceRevisions(projectId, locationId, conversionWorkspaceId);
  }

  // Retrieves revisions associated with a specified conversion workspace.
  public static void describeConversionWorkspaceRevisions(
      String projectId, String locationId, String conversionWorkspaceId) throws IOException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String conversionWorkspace =
          String.format(
              "projects/%s/locations/%s/conversionWorkspaces/%s",
              projectId, locationId, conversionWorkspaceId);

      DescribeConversionWorkspaceRevisionsRequest request =
          DescribeConversionWorkspaceRevisionsRequest.newBuilder()
              .setConversionWorkspace(conversionWorkspace)
              .build();

      DescribeConversionWorkspaceRevisionsResponse response =
          client.describeConversionWorkspaceRevisions(request);

      for (ConversionWorkspace revision : response.getRevisionsList()) {
        System.out.println("Revision name: " + revision.getName());
      }
    }
  }
}
// [END datamigration_v1_datamigrationservice_describe_conversion_workspace_revisions]
