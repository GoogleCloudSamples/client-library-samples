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

// [START cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
import com.google.cloud.kms.v1.CryptoKey;
import com.google.cloud.kms.v1.CryptoKeyName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import java.io.IOException;

public class UpdateCryptoKeyPrimaryVersion {

  public static void main(String[] args) throws IOException {
    String cryptoKeyVersionId = "example-crypto-key-version-id";
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    updateCryptoKeyPrimaryVersion(
        cryptoKeyVersionId, projectId, locationId, keyRingId, cryptoKeyId);
  }

  public static void updateCryptoKeyPrimaryVersion(
      String cryptoKeyVersionId,
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = CryptoKeyName.format(projectId, locationId, keyRingId, cryptoKeyId);

      CryptoKey response = client.updateCryptoKeyPrimaryVersion(name, cryptoKeyVersionId);

      System.out.printf("Updated primary version: %s%n", response.getPrimary().getName());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
