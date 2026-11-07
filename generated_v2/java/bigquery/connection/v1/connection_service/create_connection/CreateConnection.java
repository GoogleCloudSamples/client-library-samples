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

// [START bigqueryconnection_v1_connectionservice_connection_create]
import com.google.cloud.bigquery.connection.v1.CloudResourceProperties;
import com.google.cloud.bigquery.connection.v1.Connection;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

public class CreateConnection {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String connectionId = "example-connection-id";
    createConnection(projectId, locationId, connectionId);
  }

  public static void createConnection(
      String projectId, String locationId, String connectionId) throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Connection connection =
          Connection.newBuilder()
              .setFriendlyName("Sample Connection")
              .setDescription("Connection for BigLake Cloud Resource")
              .setCloudResource(CloudResourceProperties.newBuilder().build())
              .build();

      Connection response = client.createConnection(parent, connection, connectionId);
      System.out.println("Created connection: " + response.getName());
    }
  }
}
// [END bigqueryconnection_v1_connectionservice_connection_create]
