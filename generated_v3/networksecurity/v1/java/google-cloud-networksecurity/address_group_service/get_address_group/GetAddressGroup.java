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

// [START networksecurity_v1_addressgroupservice_addressgroup_get]
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupName;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import java.io.IOException;

public class GetAddressGroup {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String addressGroupId = "example-address-group-id";
    getAddressGroup(projectId, locationId, addressGroupId);
  }

  public static void getAddressGroup(String projectId, String locationId, String addressGroupId)
      throws Exception {
    // Initialize the client with Application Default Credentials.
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String name = AddressGroupName.of(projectId, locationId, addressGroupId).toString();

      AddressGroup response = client.getAddressGroup(name);
      System.out.println("Address group retrieved successfully: " + response.getName());
      System.out.println("Capacity: " + response.getCapacity());
      System.out.println("Type: " + response.getType());
      System.out.println("Items count: " + response.getItemsCount());
    }
  }
}
// [END networksecurity_v1_addressgroupservice_addressgroup_get]
