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

// [START bigqueryconnection_v1beta1_connectionservice_connections_list]
import com.google.cloud.bigquery.connection.v1beta1.ConnectionProto.Connection;
import com.google.cloud.bigquery.connection.v1beta1.ConnectionProto.ListConnectionsResponse;
import com.google.cloud.bigquery.connection.v1beta1.ConnectionServiceClient;
import com.google.protobuf.UInt32Value;
import java.io.IOException;

public class ListConnections {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listConnections(projectId, locationId);
  }

  public static void listConnections(String projectId, String locationId) throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      UInt32Value maxResults = UInt32Value.of(10);

      ListConnectionsResponse response = client.listConnections(parent, maxResults);
      for (Connection connection : response.getConnectionsList()) {
        System.out.println("Connection name: " + connection.getName());
      }
    }
  }
}
// [END bigqueryconnection_v1beta1_connectionservice_connections_list]
