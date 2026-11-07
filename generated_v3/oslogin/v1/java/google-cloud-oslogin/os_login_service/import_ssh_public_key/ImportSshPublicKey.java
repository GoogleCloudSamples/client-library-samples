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

// [START oslogin_v1_osloginservice_import_ssh_public_key]
import com.google.cloud.oslogin.common.OsLoginProto.SshPublicKey;
import com.google.cloud.oslogin.v1.ImportSshPublicKeyResponse;
import com.google.cloud.oslogin.v1.OsLoginServiceClient;

public class ImportSshPublicKey {

  public static void main(String[] args) throws Exception {
    String userId = "example-user_id";
    importSshPublicKey(userId);
  }

  public static void importSshPublicKey(String userId) throws Exception {
    try (OsLoginServiceClient client = OsLoginServiceClient.create()) {
      String parent = "users/" + userId;
      SshPublicKey sshPublicKey =
          SshPublicKey.newBuilder()
              .setKey("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... example-user@example.com")
              .build();

      ImportSshPublicKeyResponse response = client.importSshPublicKey(parent, sshPublicKey);
      System.out.println("Imported SSH public key for: " + response.getLoginProfile().getName());
    }
  }
}
// [END oslogin_v1_osloginservice_import_ssh_public_key]
