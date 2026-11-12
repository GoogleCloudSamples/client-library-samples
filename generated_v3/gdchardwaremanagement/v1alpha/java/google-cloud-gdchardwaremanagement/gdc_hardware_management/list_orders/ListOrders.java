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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.Order;

public class ListOrders {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listOrders(projectId, locationId);
  }

  public static void listOrders(String projectId, String locationId) throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      for (Order order : client.listOrders(parent).iterateAll()) {
        System.out.println("Order: " + order.getName());
      }
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
