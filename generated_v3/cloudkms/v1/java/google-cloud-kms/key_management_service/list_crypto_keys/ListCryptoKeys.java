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

// [START cloudkms_v1_keymanagementservice_cryptokeys_list]
import com.google.cloud.kms.v1.CryptoKey;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.cloud.kms.v1.KeyRingName;
import java.io.IOException;

public class ListCryptoKeys {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    listCryptoKeys(projectId, locationId, keyRingId);
  }

  public static void listCryptoKeys(String projectId, String locationId, String keyRingId)
      throws IOException {
    // Initialize the client that sends requests. The client can be reused for multiple requests.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String parent = KeyRingName.of(projectId, locationId, keyRingId).toString();

      // Retrieve and print all crypto keys within the specified key ring.
      for (CryptoKey cryptoKey : client.listCryptoKeys(parent).iterateAll()) {
        System.out.println("CryptoKey: " + cryptoKey.getName());
        System.out.println("Purpose: " + cryptoKey.getPurpose());
      }
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokeys_list]
