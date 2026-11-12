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

// [START datamigration_v1_datamigrationservice_connectionprofile_delete]
import com.google.cloud.clouddms.v1.ConnectionProfileName;
import com.google.cloud.clouddms.v1.DataMigrationServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteConnectionProfile {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String connectionProfileId = "example-connection-profile-id";
    deleteConnectionProfile(projectId, locationId, connectionProfileId);
  }

  public static void deleteConnectionProfile(
      String projectId, String locationId, String connectionProfileId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (DataMigrationServiceClient client = DataMigrationServiceClient.create()) {
      String name =
          ConnectionProfileName.of(projectId, locationId, connectionProfileId).toString();

      // DeleteConnectionProfile is a long-running operation; wait for it to complete.
      client.deleteConnectionProfileAsync(name).get(10, TimeUnit.MINUTES);
      System.out.println("Connection profile deleted: " + name);
    }
  }
}
// [END datamigration_v1_datamigrationservice_connectionprofile_delete]
