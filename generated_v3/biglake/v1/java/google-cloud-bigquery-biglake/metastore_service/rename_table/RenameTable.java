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

// [START biglake_v1_metastoreservice_rename_table]
import com.google.cloud.bigquery.biglake.v1.MetastoreServiceClient;
import com.google.cloud.bigquery.biglake.v1.RenameTableRequest;
import com.google.cloud.bigquery.biglake.v1.Table;
import com.google.cloud.bigquery.biglake.v1.TableName;
import java.io.IOException;

public class RenameTable {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String catalogId = "example-catalog_id";
    String databaseId = "example-database_id";
    String tableId = "example-table_id";
    String newTableId = "example-new_table_id";
    String projectId = "example-project_id";
    renameTable(locationId, catalogId, databaseId, tableId, newTableId, projectId);
  }

  public static void renameTable(
      String locationId,
      String catalogId,
      String databaseId,
      String tableId,
      String newTableId,
      String projectId)
      throws IOException {
    try (MetastoreServiceClient client = MetastoreServiceClient.create()) {
      String newName =
          TableName.of(projectId, locationId, catalogId, databaseId, newTableId).toString();
      String name = TableName.of(projectId, locationId, catalogId, databaseId, tableId).toString();

      RenameTableRequest request =
          RenameTableRequest.newBuilder()
              .setName(name)
              .setNewName(newName)
              .build();

      Table response = client.renameTable(request);
      System.out.println("Renamed table: " + response.getName());
    }
  }
}
// [END biglake_v1_metastoreservice_rename_table]
