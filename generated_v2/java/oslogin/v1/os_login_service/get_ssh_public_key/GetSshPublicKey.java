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

// [START oslogin_v1_osloginservice_sshpublickey_get]
import com.google.cloud.oslogin.common.OsLoginProto.SshPublicKey;
import com.google.cloud.oslogin.v1.OsLoginServiceClient;

public class GetSshPublicKey {

  public static void main(String[] args) throws Exception {
    String userId = "example-user_id";
    String sshPublicKeyId = "example-ssh_public_key_id";
    getSshPublicKey(userId, sshPublicKeyId);
  }

  public static void getSshPublicKey(String userId, String sshPublicKeyId) throws Exception {
    try (OsLoginServiceClient client = OsLoginServiceClient.create()) {
      String name = String.format("users/%s/sshPublicKeys/%s", userId, sshPublicKeyId);
      SshPublicKey response = client.getSshPublicKey(name);
      System.out.println("Retrieved SSH public key: " + response.getKey());
    }
  }
}
// [END oslogin_v1_osloginservice_sshpublickey_get]
