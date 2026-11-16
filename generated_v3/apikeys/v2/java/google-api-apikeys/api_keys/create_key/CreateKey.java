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

// [START apikeys_v2_apikeys_key_create]
import com.google.api.apikeys.v2.ApiKeysClient;
import com.google.api.apikeys.v2.Key;
import com.google.api.apikeys.v2.LocationName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateKey {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String keyId = "example-key-id";
    createKey(projectId, locationId, keyId);
  }

  public static void createKey(String projectId, String locationId, String keyId) throws Exception {
    try (ApiKeysClient client = ApiKeysClient.create()) {
      Key key = Key.newBuilder()
          .setDisplayName("Example API Key")
          .build();
      String parent = LocationName.of(projectId, locationId).toString();

      // Long-running operations require polling until completion
      Key response = client.createKeyAsync(parent, key, keyId).get(3, TimeUnit.MINUTES);
      System.out.printf("Successfully created API key: %s%n", response.getName());
    }
  }
}
// [END apikeys_v2_apikeys_key_create]
