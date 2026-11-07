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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.Sku;
import com.google.cloud.gdchardwaremanagement.v1alpha.SkuName;
import java.io.IOException;

public class GetSku {

  public static void getSku(String projectId, String locationId, String skuId) throws IOException {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String name = SkuName.of(projectId, locationId, skuId).toString();
      Sku response = client.getSku(name);
      System.out.println("Retrieved SKU: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
