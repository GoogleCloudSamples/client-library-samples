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

package com.google.cloud.discoveryengine.v1;

// [START discoveryengine_v1_identitymappingstoreservice_identitymappingstores_list]
import com.google.cloud.discoveryengine.v1.IdentityMappingStore;
import com.google.cloud.discoveryengine.v1.IdentityMappingStoreServiceClient;
import com.google.cloud.discoveryengine.v1.LocationName;
import java.io.IOException;

public class ListIdentityMappingStores {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listIdentityMappingStores(projectId, locationId);
  }

  public static void listIdentityMappingStores(String projectId, String locationId)
      throws Exception {
    // Initialize client that will be closed when the block ends.
    try (IdentityMappingStoreServiceClient client = IdentityMappingStoreServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      // Iterate through all identity mapping stores in the specified location.
      for (IdentityMappingStore identityMappingStore :
          client.listIdentityMappingStores(parent).iterateAll()) {
        System.out.println("Identity mapping store name: " + identityMappingStore.getName());
      }
    }
  }
}
// [END discoveryengine_v1_identitymappingstoreservice_identitymappingstores_list]
