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

// [START datamigration_v1_datamigrationservice_conversionworkspace_get]
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.ConversionWorkspaceName;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import java.io.IOException;

public class GetConversionWorkspace {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String conversionWorkspaceId = "example-conversion-workspace-id";
    getConversionWorkspace(projectId, locationId, conversionWorkspaceId);
  }

  public static void getConversionWorkspace(
      String projectId, String locationId, String conversionWorkspaceId) throws IOException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String name =
          ConversionWorkspaceName.of(projectId, locationId, conversionWorkspaceId).toString();
      ConversionWorkspace response = client.getConversionWorkspace(name);
      System.out.println("Conversion workspace name: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_conversionworkspace_get]
