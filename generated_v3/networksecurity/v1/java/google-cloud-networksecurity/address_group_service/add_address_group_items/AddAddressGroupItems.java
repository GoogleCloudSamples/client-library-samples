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

// [START networksecurity_v1_addressgroupservice_add_address_group_items]
import com.google.cloud.networksecurity.v1.AddAddressGroupItemsRequest;
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupName;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AddAddressGroupItems {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String addressGroupId = "example-address_group_id";
    addAddressGroupItems(projectId, locationId, addressGroupId);
  }

  public static void addAddressGroupItems(
      String projectId, String locationId, String addressGroupId) throws Exception {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String addressGroup =
          AddressGroupName.of(projectId, locationId, addressGroupId).toString();
      String items = "10.0.0.0/24";

      AddAddressGroupItemsRequest request =
          AddAddressGroupItemsRequest.newBuilder()
              .setAddressGroup(addressGroup)
              .addItems(items)
              .build();

      // AddAddressGroupItems is a long-running operation.
      AddressGroup response = client.addAddressGroupItemsAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Added items to address group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_addressgroupservice_add_address_group_items]
