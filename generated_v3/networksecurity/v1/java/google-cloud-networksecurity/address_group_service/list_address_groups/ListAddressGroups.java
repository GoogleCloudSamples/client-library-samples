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

// [START networksecurity_v1_addressgroupservice_addressgroups_list]
import com.google.cloud.networksecurity.v1.AddressGroup;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import java.io.IOException;

public class ListAddressGroups {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listAddressGroups(projectId, locationId);
  }

  public static void listAddressGroups(String projectId, String locationId) throws Exception {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (AddressGroup addressGroup : client.listAddressGroups(parent).iterateAll()) {
        System.out.printf("Address Group: %s%n", addressGroup.getName());
        System.out.printf("Capacity: %d%n", addressGroup.getCapacity());
        System.out.printf("Type: %s%n", addressGroup.getType());
      }
    }
  }
}
// [END networksecurity_v1_addressgroupservice_addressgroups_list]
