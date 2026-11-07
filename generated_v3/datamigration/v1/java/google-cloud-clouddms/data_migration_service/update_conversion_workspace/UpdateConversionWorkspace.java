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

// [START datamigration_v1_datamigrationservice_conversionworkspace_update]
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.protobuf.FieldMask;
import java.util.concurrent.TimeUnit;

public class UpdateConversionWorkspace {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String conversionWorkspaceId = "example-conversion-workspace-id";
    updateConversionWorkspace(projectId, locationId, conversionWorkspaceId);
  }

  public static void updateConversionWorkspace(
      String projectId, String locationId, String conversionWorkspaceId) throws Exception {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      // Specify display_name in the update mask to perform a targeted field update.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      String conversionWorkspaceName =
          String.format(
              "projects/%s/locations/%s/conversionWorkspaces/%s",
              projectId, locationId, conversionWorkspaceId);

      // Construct the conversion workspace entity containing the updated field.
      ConversionWorkspace conversionWorkspace =
          ConversionWorkspace.newBuilder()
              .setName(conversionWorkspaceName)
              .setDisplayName("Updated Workspace")
              .build();

      // Start the long-running operation and wait for completion.
      ConversionWorkspace response =
          client
              .updateConversionWorkspaceAsync(conversionWorkspace, updateMask)
              .get(10, TimeUnit.MINUTES);

      System.out.println("Updated conversion workspace: " + response.getName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_conversionworkspace_update]
