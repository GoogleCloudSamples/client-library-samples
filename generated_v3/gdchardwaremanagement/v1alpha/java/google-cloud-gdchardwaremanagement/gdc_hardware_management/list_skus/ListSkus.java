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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_skus_list]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.LocationName;
import com.google.cloud.gdchardwaremanagement.v1alpha.Sku;
import java.io.IOException;

public class ListSkus {

  public static void main(String[] args) throws IOException {
    if (args.length >= 2) {
      String projectId = args[0];
      String locationId = args[1];
      listSkus(projectId, locationId);
    }
  }

  public static void listSkus(String projectId, String locationId) throws IOException {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (Sku sku : client.listSkus(parent).iterateAll()) {
        System.out.println("Found SKU: " + sku.getName());
      }
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_skus_list]
