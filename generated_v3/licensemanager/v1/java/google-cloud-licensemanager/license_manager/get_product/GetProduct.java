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

package com.google.cloud.licensemanager.v1;

// [START licensemanager_v1_licensemanager_product_get]
import com.google.cloud.licensemanager.v1.LicenseManagerClient;
import com.google.cloud.licensemanager.v1.Product;
import com.google.cloud.licensemanager.v1.ProductName;

public class GetProduct {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String productId = "example-product_id";
    getProduct(projectId, locationId, productId);
  }

  public static void getProduct(String projectId, String locationId, String productId)
      throws Exception {
    // Initialize client that will be closed automatically with try-with-resources
    try (LicenseManagerClient client = LicenseManagerClient.create()) {
      String name = ProductName.of(projectId, locationId, productId).toString();

      Product product = client.getProduct(name);
      System.out.println("Product retrieved: " + product.getName());
    }
  }
}
// [END licensemanager_v1_licensemanager_product_get]
