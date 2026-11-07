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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_addressgroupservice_addressgroup_update]
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupName;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateAddressGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String addressGroupId = "example-address_group_id";
    updateAddressGroup(projectId, locationId, addressGroupId);
  }

  public static void updateAddressGroup(
      String projectId, String locationId, String addressGroupId) throws Exception {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      AddressGroup addressGroup =
          AddressGroup.newBuilder()
              .setName(AddressGroupName.of(projectId, locationId, addressGroupId).toString())
              .setDescription("Updated address group description")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Initiate the long-running operation and wait for completion.
      AddressGroup response =
          client.updateAddressGroupAsync(addressGroup, updateMask).get(3, TimeUnit.MINUTES);

      System.out.println("Updated Address Group: " + response.getName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END networksecurity_v1_addressgroupservice_addressgroup_update]
