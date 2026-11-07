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

// [START licensemanager_v1_licensemanager_products_list]
import com.google.cloud.licensemanager.v1.LicenseManagerClient;
import com.google.cloud.licensemanager.v1.Product;

public class ListProducts {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listProducts(projectId, locationId);
  }

  public static void listProducts(String projectId, String locationId) throws Exception {
    try (LicenseManagerClient client = LicenseManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Product product : client.listProducts(parent).iterateAll()) {
        System.out.println("Product name: " + product.getName());
      }
    }
  }
}
// [END licensemanager_v1_licensemanager_products_list]
