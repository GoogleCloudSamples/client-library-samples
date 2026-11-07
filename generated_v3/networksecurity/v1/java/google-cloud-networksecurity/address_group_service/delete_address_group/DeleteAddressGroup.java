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

// [START networksecurity_v1_addressgroupservice_addressgroup_delete]
import com.google.cloud.networksecurity.v1.AddressGroupName;
import com.google.cloud.networksecurity.v1.AddressGroupServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteAddressGroup {

  public static void deleteAddressGroup(String projectId, String locationId, String addressGroupId)
      throws IOException, ExecutionException, InterruptedException {
    try (AddressGroupServiceClient client = AddressGroupServiceClient.create()) {
      String name = AddressGroupName.of(projectId, locationId, addressGroupId).toString();
      client.deleteAddressGroupAsync(name).get();
      System.out.println("Deleted address group: " + name);
    }
  }
}
// [END networksecurity_v1_addressgroupservice_addressgroup_delete]
