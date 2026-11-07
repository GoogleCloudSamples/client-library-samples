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

// [START datastream_v1_datastream_privateconnection_delete]
import com.google.cloud.datastream.v1.DatastreamClient;
import com.google.cloud.datastream.v1.PrivateConnectionName;

public class DeletePrivateConnection {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String privateConnectionId = "example-private-connection-id";
    deletePrivateConnection(projectId, locationId, privateConnectionId);
  }

  public static void deletePrivateConnection(
      String projectId, String locationId, String privateConnectionId) throws Exception {
    try (DatastreamClient client = DatastreamClient.create()) {
      String name =
          PrivateConnectionName.of(projectId, locationId, privateConnectionId).toString();

      // DeletePrivateConnection is a long-running operation; wait for completion.
      client.deletePrivateConnectionAsync(name).get();
      System.out.println("Deleted private connection: " + name);
    }
  }
}
// [END datastream_v1_datastream_privateconnection_delete]
