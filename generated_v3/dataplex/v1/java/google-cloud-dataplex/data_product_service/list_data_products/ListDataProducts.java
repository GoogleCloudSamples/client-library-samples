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

// [START dataplex_v1_dataproductservice_dataproducts_list]
import com.google.cloud.dataplex.v1.DataProduct;
import com.google.cloud.dataplex.v1.DataProductServiceClient;

import java.io.IOException;

public class ListDataProducts {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String projectId = "example-project_id";
    listDataProducts(locationId, projectId);
  }

  public static void listDataProducts(String locationId, String projectId) throws Exception {
    try (DataProductServiceClient client = DataProductServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      // Iterate over the retrieved data products and print their resource names.
      for (DataProduct dataProduct : client.listDataProducts(parent).iterateAll()) {
        System.out.println("Data Product: " + dataProduct.getName());
        System.out.println("Display Name: " + dataProduct.getDisplayName());
      }
    }
  }
}
// [END dataplex_v1_dataproductservice_dataproducts_list]
