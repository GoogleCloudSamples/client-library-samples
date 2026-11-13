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

package com.google.api.apikeys.v2;

// [START apikeys_v2_apikeys_keys_list]
import com.google.api.apikeys.v2.ApiKeysClient;
import com.google.api.apikeys.v2.Key;
import com.google.api.apikeys.v2.LocationName;
import java.io.IOException;

public class ListKeys {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // API keys are global resources.
    String locationId = "global";
    listKeys(projectId, locationId);
  }

  public static void listKeys(String projectId, String locationId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ApiKeysClient client = ApiKeysClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (Key key : client.listKeys(parent).iterateAll()) {
        System.out.println("Key name: " + key.getName());
        System.out.println("Display name: " + key.getDisplayName());
      }
    }
  }
}
// [END apikeys_v2_apikeys_keys_list]
