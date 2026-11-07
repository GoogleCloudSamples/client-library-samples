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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroups_list]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.HardwareGroup;
import com.google.cloud.gdchardwaremanagement.v1alpha.ListHardwareGroupsRequest;
import java.io.IOException;

public class ListHardwareGroups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String orderId = "example-order-id";
    listHardwareGroups(projectId, locationId, orderId);
  }

  public static void listHardwareGroups(String projectId, String locationId, String orderId)
      throws Exception {
    // Initialize client that will be closed at the end of the try-with-resources block.
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s/orders/%s", projectId, locationId, orderId);
      ListHardwareGroupsRequest request =
          ListHardwareGroupsRequest.newBuilder().setParent(parent).build();

      for (HardwareGroup hardwareGroup : client.listHardwareGroups(request).iterateAll()) {
        System.out.println("Hardware group: " + hardwareGroup.getName());
      }
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroups_list]
