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

package com.google.cloud.biglake.v1alpha1;

// [START biglake_v1alpha1_metastoreservice_table_create]
import com.google.cloud.bigquery.biglake.v1alpha1.DatabaseName;
import com.google.cloud.bigquery.biglake.v1alpha1.MetastoreServiceClient;
import com.google.cloud.bigquery.biglake.v1alpha1.Table;
import java.io.IOException;

public class CreateTable {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String catalogId = "example-catalog_id";
    String databaseId = "example-database_id";
    String tableId = "example-table_id";
    String projectId = "example-project_id";
    createTable(locationId, catalogId, databaseId, tableId, projectId);
  }

  public static void createTable(
      String locationId, String catalogId, String databaseId, String tableId, String projectId)
      throws IOException {
    try (MetastoreServiceClient client = MetastoreServiceClient.create()) {
      String parent = DatabaseName.of(projectId, locationId, catalogId, databaseId).toString();
      Table table = Table.newBuilder().setType(Table.Type.HIVE).build();

      Table response = client.createTable(parent, table, tableId);
      System.out.println("Created table: " + response.getName());
    }
  }
}
// [END biglake_v1alpha1_metastoreservice_table_create]
