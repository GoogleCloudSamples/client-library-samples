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

// [START datamigration_v1_datamigrationservice_privateconnection_get]
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.PrivateConnection;
import com.google.cloud.clouddms.v1.PrivateConnectionName;
import java.io.IOException;

public class GetPrivateConnection {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String privateConnectionId = "example-private-connection-id";
    getPrivateConnection(projectId, locationId, privateConnectionId);
  }

  public static void getPrivateConnection(
      String projectId, String locationId, String privateConnectionId) throws IOException {
    // Initialize client that will be closed when the block finishes.
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String name =
          PrivateConnectionName.of(projectId, locationId, privateConnectionId).toString();

      PrivateConnection response = client.getPrivateConnection(name);

      System.out.println("Private connection retrieved successfully: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END datamigration_v1_datamigrationservice_privateconnection_get]
