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

// [START datamigration_v1_datamigrationservice_conversionworkspaces_list]
import com.google.cloud.clouddms.v1.ConversionWorkspace;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.ListConversionWorkspacesRequest;
import java.io.IOException;

public class ListConversionWorkspaces {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listConversionWorkspaces(projectId, locationId);
  }

  public static void listConversionWorkspaces(String projectId, String locationId)
      throws IOException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      ListConversionWorkspacesRequest request =
          ListConversionWorkspacesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (ConversionWorkspace workspace : client.listConversionWorkspaces(request).iterateAll()) {
        System.out.println("Found conversion workspace: " + workspace.getName());
      }
    }
  }
}
// [END datamigration_v1_datamigrationservice_conversionworkspaces_list]
