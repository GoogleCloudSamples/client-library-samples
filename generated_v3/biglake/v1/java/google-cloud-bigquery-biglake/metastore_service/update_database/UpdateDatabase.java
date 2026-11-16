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

package com.google.cloud.biglake.v1;

// [START biglake_v1_metastoreservice_database_update]
import com.google.cloud.bigquery.biglake.v1.Database;
import com.google.cloud.bigquery.biglake.v1.DatabaseName;
import com.google.cloud.bigquery.biglake.v1.MetastoreServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateDatabase {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String catalogId = "example-catalog_id";
    String databaseId = "example-database_id";
    String projectId = "example-project_id";
    updateDatabase(locationId, catalogId, databaseId, projectId);
  }

  public static void updateDatabase(
      String locationId, String catalogId, String databaseId, String projectId) throws Exception {
    try (MetastoreServiceClient client = MetastoreServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("type").build();
      Database database =
          Database.newBuilder()
              .setName(DatabaseName.of(projectId, locationId, catalogId, databaseId).toString())
              .setType(Database.Type.HIVE)
              .build();

      Database response = client.updateDatabase(database, updateMask);
      System.out.println("Updated database: " + response.getName());
    }
  }
}
// [END biglake_v1_metastoreservice_database_update]
