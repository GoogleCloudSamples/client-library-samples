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

package com.google.cloud.cloudshell.v1;

// [START cloudshell_v1_cloudshellservice_add_public_key]
import com.google.cloud.shell.v1.AddPublicKeyRequest;
import com.google.cloud.shell.v1.AddPublicKeyResponse;
import com.google.cloud.shell.v1.CloudShellServiceClient;
import com.google.cloud.shell.v1.EnvironmentName;
import java.util.concurrent.TimeUnit;

public class AddPublicKey {

  public static void main(String[] args) throws Exception {
    String userId = "example-user-id";
    String environmentId = "example-environment-id";
    String key = "example-key";
    addPublicKey(userId, environmentId, key);
  }

  public static void addPublicKey(String userId, String environmentId, String key)
      throws Exception {
    try (CloudShellServiceClient client = CloudShellServiceClient.create()) {
      String environment = EnvironmentName.of(userId, environmentId).toString();

      AddPublicKeyRequest request =
          AddPublicKeyRequest.newBuilder()
              .setEnvironment(environment)
              .setKey(key)
              .build();

      AddPublicKeyResponse response = client.addPublicKeyAsync(request).get(5, TimeUnit.MINUTES);
      System.out.println("Public key added: " + response.getKey());
    }
  }
}
// [END cloudshell_v1_cloudshellservice_add_public_key]
