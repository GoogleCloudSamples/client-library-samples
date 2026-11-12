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

// [START datastream_v1_datastream_connectionprofile_update]
import com.google.api.gax.rpc.AbortedException;
import com.google.cloud.datastream.v1.ConnectionProfile;
import com.google.cloud.datastream.v1.ConnectionProfileName;
import com.google.cloud.datastream.v1.DatastreamClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateConnectionProfile {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String connectionProfileId = "example-connection-profile-id";
    updateConnectionProfile(projectId, locationId, connectionProfileId);
  }

  public static void updateConnectionProfile(
      String projectId, String locationId, String connectionProfileId) throws Exception {
    try (DatastreamClient client = DatastreamClient.create()) {
      ConnectionProfile connectionProfile =
          ConnectionProfile.newBuilder()
              .setName(
                  ConnectionProfileName.of(projectId, locationId, connectionProfileId).toString())
              .setDisplayName("Updated Connection Profile")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      ConnectionProfile response = null;
      int maxRetries = 12;
      for (int i = 0; i < maxRetries; i++) {
        try {
          // Initiate the update operation and await completion.
          response =
              client
                  .updateConnectionProfileAsync(connectionProfile, updateMask)
                  .get(5, TimeUnit.MINUTES);
          break;
        } catch (ExecutionException e) {
          // Wait for any in-progress creation operation to complete before retrying.
          if (e.getCause() instanceof AbortedException && i < maxRetries - 1) {
            TimeUnit.SECONDS.sleep(10);
            continue;
          }
          throw e;
        } catch (AbortedException e) {
          if (i < maxRetries - 1) {
            TimeUnit.SECONDS.sleep(10);
            continue;
          }
          throw e;
        }
      }

      System.out.println("Connection Profile updated successfully: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
    }
  }
}
// [END datastream_v1_datastream_connectionprofile_update]
