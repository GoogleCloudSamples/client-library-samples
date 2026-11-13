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

// [START biglake_v1alpha1_metastoreservice_catalog_create]
import com.google.cloud.bigquery.biglake.v1alpha1.Catalog;
import com.google.cloud.bigquery.biglake.v1alpha1.MetastoreServiceClient;
import java.io.IOException;

public class CreateCatalog {

  public static void main(String[] args) throws IOException {
    String locationId = "example-location_id";
    String catalogId = "example-catalog_id";
    String projectId = "example-project_id";
    createCatalog(locationId, catalogId, projectId);
  }

  public static void createCatalog(String locationId, String catalogId, String projectId)
      throws IOException {
    try (MetastoreServiceClient client = MetastoreServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Catalog catalog = Catalog.newBuilder().build();

      Catalog response = client.createCatalog(parent, catalog, catalogId);
      System.out.println("Created catalog: " + response.getName());
    }
  }
}
// [END biglake_v1alpha1_metastoreservice_catalog_create]
