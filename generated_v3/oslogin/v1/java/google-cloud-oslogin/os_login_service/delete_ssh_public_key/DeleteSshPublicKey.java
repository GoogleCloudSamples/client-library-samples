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

package com.google.cloud.oslogin.v1;

// [START oslogin_v1_osloginservice_sshpublickey_delete]
import com.google.cloud.oslogin.v1.FingerprintName;
import com.google.cloud.oslogin.v1.OsLoginServiceClient;

public class DeleteSshPublicKey {

  public static void main(String[] args) throws Exception {
    String userId = "example-user_id";
    String fingerprintId = "example-fingerprint_id";
    deleteSshPublicKey(userId, fingerprintId);
  }

  public static void deleteSshPublicKey(String userId, String fingerprintId) throws Exception {
    try (OsLoginServiceClient client = OsLoginServiceClient.create()) {
      String name = FingerprintName.of(userId, fingerprintId).toString();
      client.deleteSshPublicKey(name);
      System.out.printf("Deleted SSH public key: %s%n", name);
    }
  }
}
// [END oslogin_v1_osloginservice_sshpublickey_delete]
