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

// [START cloudkms_v1_keymanagementservice_cryptokey_delete]
import com.google.cloud.kms.v1.CryptoKeyName;
import com.google.cloud.kms.v1.KeyManagementServiceClient;
import java.util.concurrent.TimeUnit;

public class DeleteCryptoKey {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String keyRingId = "example-key-ring-id";
    String cryptoKeyId = "example-crypto-key-id";
    deleteCryptoKey(projectId, locationId, keyRingId, cryptoKeyId);
  }

  public static void deleteCryptoKey(
      String projectId, String locationId, String keyRingId, String cryptoKeyId)
      throws Exception {
    try (KeyManagementServiceClient client = KeyManagementServiceClient.create()) {
      String name = CryptoKeyName.format(projectId, locationId, keyRingId, cryptoKeyId);

      // Permanently delete the CryptoKey after waiting for the operation to complete
      client.deleteCryptoKeyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted CryptoKey: " + name);
    }
  }
}
// [END cloudkms_v1_keymanagementservice_cryptokey_delete]
