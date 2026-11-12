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

// [START datamigration_v1_datamigrationservice_conversionworkspace_create]
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.DatabaseEngine;
import com.google.cloud.clouddms.v1.DatabaseEngineInfo;

public class CreateConversionWorkspace {

  public static void main(String[] args) throws Exception {
    String conversionWorkspaceId = "example-conversion-workspace-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createConversionWorkspace(conversionWorkspaceId, projectId, locationId);
  }

  public static void createConversionWorkspace(
      String conversionWorkspaceId, String projectId, String locationId) throws Exception {
    // Initialize client with Application Default Credentials
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      DatabaseEngineInfo source =
          DatabaseEngineInfo.newBuilder()
              .setEngine(DatabaseEngine.ORACLE)
              .setVersion("12.c.1")
              .build();

      DatabaseEngineInfo destination =
          DatabaseEngineInfo.newBuilder()
              .setEngine(DatabaseEngine.POSTGRESQL)
              .setVersion("14")
              .build();

      ConversionWorkspace conversionWorkspace =
          ConversionWorkspace.newBuilder()
              .setDisplayName("Example Conversion Workspace")
              .setSource(source)
              .setDestination(destination)
              .build();

      // CreateConversionWorkspace is a long-running operation; wait for completion
      ConversionWorkspace response =
          client
              .createConversionWorkspaceAsync(parent, conversionWorkspace, conversionWorkspaceId)
              .get();

      System.out.println("Conversion workspace created: " + response.getName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_conversionworkspace_create]
