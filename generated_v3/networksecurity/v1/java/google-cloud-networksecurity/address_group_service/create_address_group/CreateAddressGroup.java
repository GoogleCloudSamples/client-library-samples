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

// [START networksecurity_v1_addressgroupservice_addressgroup_create]
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateAddressGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String addressGroupId = "example-address_group_id";
    createAddressGroup(projectId, locationId, addressGroupId);
  }

  public static void createAddressGroup(String projectId, String locationId, String addressGroupId)
      throws Exception {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      AddressGroup addressGroup =
          AddressGroup.newBuilder()
              .setType(AddressGroup.Type.IPV4)
              .setCapacity(100)
              .addItems("10.0.0.0/24")
              .build();

      AddressGroup response =
          client
              .createAddressGroupAsync(parent, addressGroup, addressGroupId)
              .get(5, TimeUnit.MINUTES);
      System.out.println("Created address group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_addressgroupservice_addressgroup_create]
