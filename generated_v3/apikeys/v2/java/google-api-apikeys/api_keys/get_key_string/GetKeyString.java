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

// [START apikeys_v2_apikeys_keystring_get]
import com.google.api.apikeys.v2.ApiKeysClient;
import com.google.api.apikeys.v2.GetKeyStringResponse;
import com.google.api.apikeys.v2.KeyName;
import java.io.IOException;

public class GetKeyString {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String keyId = "example-key-id";
    getKeyString(projectId, locationId, keyId);
  }

  public static void getKeyString(String projectId, String locationId, String keyId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ApiKeysClient client = ApiKeysClient.create()) {
      String name = KeyName.of(projectId, locationId, keyId).toString();

      GetKeyStringResponse response = client.getKeyString(name);
      System.out.println("Successfully retrieved key string: " + response.getKeyString());
    }
  }
}
// [END apikeys_v2_apikeys_keystring_get]
