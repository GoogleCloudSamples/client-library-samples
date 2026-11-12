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

// [START datamigration_v1_datamigrationservice_connectionprofile_get]
import com.google.cloud.clouddms.v1.ConnectionProfile;
import com.google.cloud.clouddms.v1.ConnectionProfileName;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import java.io.IOException;

public class GetConnectionProfile {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String connectionProfileId = "example-connection-profile-id";
    getConnectionProfile(projectId, locationId, connectionProfileId);
  }

  public static void getConnectionProfile(
      String projectId, String locationId, String connectionProfileId) throws IOException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String name =
          ConnectionProfileName.of(projectId, locationId, connectionProfileId).toString();

      ConnectionProfile connectionProfile = client.getConnectionProfile(name);

      System.out.println("Connection profile name: " + connectionProfile.getName());
      System.out.println("Display name: " + connectionProfile.getDisplayName());
      System.out.println("State: " + connectionProfile.getState());
    }
  }
}
// [END datamigration_v1_datamigrationservice_connectionprofile_get]
