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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_get]
import com.google.cloud.kms.v1.CryptoKeyVersion;
import com.google.cloud.kms.v1.CryptoKeyVersionName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import java.io.IOException;

public class GetCryptoKeyVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    String cryptoKeyVersionId = "example-crypto-key-version-id";
    getCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId);
  }

  public static void getCryptoKeyVersion(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String cryptoKeyVersionId)
      throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name =
          CryptoKeyVersionName.format(
              projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId);

      CryptoKeyVersion cryptoKeyVersion = client.getCryptoKeyVersion(name);

      System.out.printf("CryptoKeyVersion Name: %s%n", cryptoKeyVersion.getName());
      System.out.printf("CryptoKeyVersion State: %s%n", cryptoKeyVersion.getState());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokeyversion_get]
