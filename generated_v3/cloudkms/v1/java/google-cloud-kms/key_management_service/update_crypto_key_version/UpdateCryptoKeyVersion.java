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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_update]
import com.google.cloud.kms.v1.CryptoKeyVersion;
import com.google.cloud.kms.v1.CryptoKeyVersion.CryptoKeyVersionState;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateCryptoKeyVersion {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    String cryptoKeyVersionId = "example-crypto-key-version-id";
    updateCryptoKeyVersion(projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId);
  }

  public static void updateCryptoKeyVersion(
      String projectId,
      String locationId,
      String keyRingId,
      String cryptoKeyId,
      String cryptoKeyVersionId)
      throws IOException {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("state").build();

      // Set the state to DISABLED to demonstrate a reversible update on a key version.
      CryptoKeyVersion cryptoKeyVersion =
          CryptoKeyVersion.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s/cryptoKeyVersions/%s",
                      projectId, locationId, keyRingId, cryptoKeyId, cryptoKeyVersionId))
              .setState(CryptoKeyVersionState.DISABLED)
              .build();

      CryptoKeyVersion response = client.updateCryptoKeyVersion(cryptoKeyVersion, updateMask);

      System.out.printf("Updated crypto key version: %s%n", response.getName());
      System.out.printf("Current state: %s%n", response.getState());
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokeyversion_update]
