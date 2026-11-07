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

package com.google.cloud.bigqueryconnection.v1;

// [START bigqueryconnection_v1_connectionservice_connection_delete]
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

public class DeleteConnection {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String connectionId = "example-connection-id";
    deleteConnection(projectId, locationId, connectionId);
  }

  public static void deleteConnection(
      String projectId, String locationId, String connectionId) throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/connections/%s", projectId, locationId, connectionId);
      client.deleteConnection(name);
      System.out.println("Connection deleted successfully: " + name);
    }
  }
}
// [END bigqueryconnection_v1_connectionservice_connection_delete]
