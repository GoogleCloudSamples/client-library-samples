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

package com.google.cloud.bigqueryconnection.v1beta1;

// [START bigqueryconnection_v1beta1_connectionservice_connection_update]
import com.google.cloud.bigquery.connection.v1beta1.ConnectionProto.Connection;
import com.google.cloud.bigquery.connection.v1beta1.ConnectionServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateConnection {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String connectionId = "example-connection_id";
    updateConnection(projectId, locationId, connectionId);
  }

  public static void updateConnection(String projectId, String locationId, String connectionId)
      throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      // Update only the description to avoid resetting connection credentials
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Connection connection =
          Connection.newBuilder().setDescription("Updated connection description").build();
      String name =
          String.format(
              "projects/%s/locations/%s/connections/%s", projectId, locationId, connectionId);

      Connection response = client.updateConnection(name, connection, updateMask);
      System.out.println("Updated connection: " + response.getName());
    }
  }
}
// [END bigqueryconnection_v1beta1_connectionservice_connection_update]
