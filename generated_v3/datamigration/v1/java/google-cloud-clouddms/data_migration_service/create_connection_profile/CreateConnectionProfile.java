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

// [START datamigration_v1_datamigrationservice_connectionprofile_create]
import com.google.cloud.clouddms.v1.ConnectionProfile;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import com.google.cloud.clouddms.v1.MySqlConnectionProfile;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateConnectionProfile {

  public static void main(String[] args) throws Exception {
    String connectionProfileId = "example-connection_profile_id";
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    createConnectionProfile(connectionProfileId, projectId, locationId);
  }

  public static void createConnectionProfile(
      String connectionProfileId, String projectId, String locationId) throws Exception {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      MySqlConnectionProfile mySqlProfile =
          MySqlConnectionProfile.newBuilder()
              .setHost("example-mysql-host")
              .setPort(3306)
              .setUsername("example-mysql-username")
              .setPassword("example-mysql-password")
              .build();

      ConnectionProfile connectionProfile =
          ConnectionProfile.newBuilder()
              .setDisplayName("Example Connection Profile")
              .setMysql(mySqlProfile)
              .build();

      // Wait for the long-running operation to complete
      ConnectionProfile response =
          client
              .createConnectionProfileAsync(parent, connectionProfile, connectionProfileId)
              .get();

      System.out.println("Connection profile created: " + response.getName());
    }
  }
}
// [END datamigration_v1_datamigrationservice_connectionprofile_create]
