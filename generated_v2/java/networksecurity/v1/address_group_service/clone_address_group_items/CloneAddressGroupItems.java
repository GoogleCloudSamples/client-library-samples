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

// [START networksecurity_v1_addressgroupservice_clone_address_group_items]
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import com.google.cloud.networksecurity.v1.CloneAddressGroupItemsRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CloneAddressGroupItems {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String addressGroupId = "example-address-group-id";
    String sourceAddressGroupId = "example-source-address-group-id";
    cloneAddressGroupItems(projectId, locationId, addressGroupId, sourceAddressGroupId);
  }

  public static void cloneAddressGroupItems(
      String projectId, String locationId, String addressGroupId, String sourceAddressGroupId)
      throws Exception {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String sourceAddressGroup =
          String.format(
              "projects/%s/locations/%s/addressGroups/%s",
              projectId, locationId, sourceAddressGroupId);
      String addressGroup =
          String.format(
              "projects/%s/locations/%s/addressGroups/%s", projectId, locationId, addressGroupId);

      CloneAddressGroupItemsRequest request =
          CloneAddressGroupItemsRequest.newBuilder()
              .setAddressGroup(addressGroup)
              .setSourceAddressGroup(sourceAddressGroup)
              .build();

      // Initiate the operation and wait for completion
      AddressGroup response = client.cloneAddressGroupItemsAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Cloned items into address group: " + response.getName());
    }
  }
}
// [END networksecurity_v1_addressgroupservice_clone_address_group_items]
