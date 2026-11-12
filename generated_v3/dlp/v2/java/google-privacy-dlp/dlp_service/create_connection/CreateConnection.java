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

package com.google.cloud.dlp.v2;

// [START dlp_v2_dlpservice_connection_create]
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.privacy.dlp.v2.CloudSqlIamCredential;
import com.google.privacy.dlp.v2.CloudSqlProperties;
import com.google.privacy.dlp.v2.CloudSqlProperties.DatabaseEngine;
import com.google.privacy.dlp.v2.Connection;
import com.google.privacy.dlp.v2.ConnectionState;
import com.google.privacy.dlp.v2.CreateConnectionRequest;
import java.io.IOException;

public class CreateConnection {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createConnection(projectId, locationId);
  }

  public static void createConnection(String projectId, String locationId) throws IOException {
    try (DlpServiceClient client = DlpServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      CloudSqlProperties cloudSql =
          CloudSqlProperties.newBuilder()
              .setConnectionName(String.format("%s:%s:example-instance", projectId, locationId))
              .setDatabaseEngine(DatabaseEngine.DATABASE_ENGINE_MYSQL)
              .setMaxConnections(2)
              .setCloudSqlIam(CloudSqlIamCredential.getDefaultInstance())
              .build();

      Connection connection =
          Connection.newBuilder()
              .setState(ConnectionState.AVAILABLE)
              .setCloudSql(cloudSql)
              .build();

      CreateConnectionRequest request =
          CreateConnectionRequest.newBuilder()
              .setParent(parent)
              .setConnection(connection)
              .build();

      Connection response = client.createConnection(request);
      System.out.println("Created connection: " + response.getName());
    }
  }
}
// [END dlp_v2_dlpservice_connection_create]
