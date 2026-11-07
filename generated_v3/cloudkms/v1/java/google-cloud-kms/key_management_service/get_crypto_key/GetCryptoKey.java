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

// [START cloudkms_v1_keymanagementservice_cryptokey_get]
import com.google.cloud.kms.v1.CryptoKey;
import com.google.cloud.kms.v1.CryptoKeyName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import java.io.IOException;

public class GetCryptoKey {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    getCryptoKey(projectId, locationId, keyRingId, cryptoKeyId);
  }

  public static void getCryptoKey(
      String projectId, String locationId, String keyRingId, String cryptoKeyId)
      throws IOException {
    // Initialize client that will be closed when complete.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = CryptoKeyName.format(projectId, locationId, keyRingId, cryptoKeyId);

      CryptoKey cryptoKey = client.getCryptoKey(name);

      System.out.printf("CryptoKey name: %s%n", cryptoKey.getName());
      System.out.printf("Purpose: %s%n", cryptoKey.getPurpose());
      System.out.printf("Create time: %s%n", cryptoKey.getCreateTime());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokey_get]
