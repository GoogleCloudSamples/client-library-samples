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

package com.google.cloud.cloudkms.v1;

// [START cloudkms_v1_keymanagementservice_keyring_get]
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.cloud.kms.v1.KeyRing;
import com.google.cloud.kms.v1.KeyRingName;
import java.io.IOException;

public class GetKeyRing {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    getKeyRing(projectId, locationId, keyRingId);
  }

  public static void getKeyRing(String projectId, String locationId, String keyRingId)
      throws IOException {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = KeyRingName.format(projectId, locationId, keyRingId);

      KeyRing response = client.getKeyRing(name);
      System.out.println("Retrieved key ring: " + response.getName());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_keyring_get]
