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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_dataproductservice_dataproduct_create]
import com.google.cloud.dataplex.v1.DataProduct;
import com.google.cloud.dataplex.v1.DataProductServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateDataProduct {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String dataProductId = "example-data_product_id";
    String projectId = "example-project_id";
    createDataProduct(locationId, dataProductId, projectId);
  }

  public static void createDataProduct(String locationId, String dataProductId, String projectId)
      throws Exception {
    try (DataProductServiceClient client = DataProductServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      DataProduct dataProduct =
          DataProduct.newBuilder()
              .setDisplayName("Sample Data Product")
              .addOwnerEmails("example-user@example.com")
              .build();

      DataProduct response =
          client
              .createDataProductAsync(parent, dataProduct, dataProductId)
              .get(5, TimeUnit.MINUTES);
      System.out.println("Created data product: " + response.getName());
    }
  }
}
// [END dataplex_v1_dataproductservice_dataproduct_create]
