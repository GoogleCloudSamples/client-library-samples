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

package com.google.cloud.datastream.v1;

// [START datastream_v1_datastream_connectionprofile_delete]
import com.google.cloud.datastream.v1.ConnectionProfileName;
import com.google.cloud.datastream.v1.DatastreamClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteConnectionProfile {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String connectionProfileId = "example-connection_profile_id";
    deleteConnectionProfile(projectId, locationId, connectionProfileId);
  }

  public static void deleteConnectionProfile(
      String projectId, String locationId, String connectionProfileId) throws Exception {
    try (DatastreamClient client = DatastreamClient.create()) {
      String name =
          ConnectionProfileName.of(projectId, locationId, connectionProfileId).toString();

      // Initiate deletion and await completion of the long-running operation.
      client.deleteConnectionProfileAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted connection profile: %s%n", name);
    }
  }
}
// [END datastream_v1_datastream_connectionprofile_delete]
