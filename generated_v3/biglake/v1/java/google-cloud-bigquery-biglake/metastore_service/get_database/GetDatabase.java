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

// [START biglake_v1_metastoreservice_database_get]
import com.google.cloud.bigquery.biglake.v1.Database;
import com.google.cloud.bigquery.biglake.v1.DatabaseName;
import com.google.cloud.bigquery.biglake.v1.MetastoreServiceClient;
import java.io.IOException;

public class GetDatabase {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String catalogId = "example-catalog_id";
    String databaseId = "example-database_id";
    String projectId = "example-project_id";
    getDatabase(locationId, catalogId, databaseId, projectId);
  }

  public static void getDatabase(
      String locationId, String catalogId, String databaseId, String projectId)
      throws IOException {
    try (MetastoreServiceClient client = MetastoreServiceClient.create()) {
      String name = DatabaseName.of(projectId, locationId, catalogId, databaseId).toString();
      Database database = client.getDatabase(name);
      System.out.println("Retrieved database: " + database.getName());
    }
  }
}
// [END biglake_v1_metastoreservice_database_get]
