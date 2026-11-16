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

// [START apikeys_v2_apikeys_undelete_key]
import com.google.api.apikeys.v2.ApiKeysClient;
import com.google.api.apikeys.v2.Key;
import com.google.api.apikeys.v2.UndeleteKeyRequest;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UndeleteKey {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "global";
    String keyId = "example-key_id";
    undeleteKey(projectId, locationId, keyId);
  }

  public static void undeleteKey(String projectId, String locationId, String keyId)
      throws Exception {
    try (ApiKeysClient client = ApiKeysClient.create()) {
      String name = String.format("projects/%s/locations/%s/keys/%s", projectId, locationId, keyId);

      UndeleteKeyRequest request = UndeleteKeyRequest.newBuilder()
          .setName(name)
          .build();

      // Wait for the long-running undelete operation to finish.
      Key key = client.undeleteKeyAsync(request).get(3, TimeUnit.MINUTES);
      System.out.printf("Undeleted key: %s%n", key.getName());
    }
  }
}
// [END apikeys_v2_apikeys_undelete_key]
