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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroup_update]
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.HardwareGroup;
import com.google.cloud.gdchardwaremanagement.v1alpha.HardwareGroupName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateHardwareGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String orderId = "example-order-id";
    String hardwareGroupId = "example-hardware-group-id";
    updateHardwareGroup(projectId, locationId, orderId, hardwareGroupId);
  }

  public static void updateHardwareGroup(
      String projectId, String locationId, String orderId, String hardwareGroupId)
      throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      // Specify the fields to update to allow partial modification of the resource.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      HardwareGroup hardwareGroup =
          HardwareGroup.newBuilder()
              .setName(
                  HardwareGroupName.of(projectId, locationId, orderId, hardwareGroupId).toString())
              .putLabels("env", "staging")
              .build();

      // Hardware group updates are long-running operations.
      HardwareGroup response =
          client.updateHardwareGroupAsync(hardwareGroup, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated hardware group: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroup_update]
