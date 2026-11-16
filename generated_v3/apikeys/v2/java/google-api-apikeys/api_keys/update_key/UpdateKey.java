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

// [START apikeys_v2_apikeys_key_update]
import com.google.api.apikeys.v2.ApiKeysClient;
import com.google.api.apikeys.v2.Key;
import com.google.api.apikeys.v2.KeyName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateKey {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String keyId = "example-key-id";
    updateKey(projectId, locationId, keyId);
  }

  public static void updateKey(String projectId, String locationId, String keyId) throws Exception {
    try (ApiKeysClient client = ApiKeysClient.create()) {
      Key key =
          Key.newBuilder()
              .setName(KeyName.of(projectId, locationId, keyId).toString())
              .setDisplayName("Updated API Key")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      // Initiate the long-running operation and wait for completion
      Key updatedKey = client.updateKeyAsync(key, updateMask).get(3, TimeUnit.MINUTES);
      System.out.println("Successfully updated the key: " + updatedKey.getName());
    }
  }
}
// [END apikeys_v2_apikeys_key_update]
