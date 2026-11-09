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

// [START oslogin_v1_osloginservice_sshpublickey_update]
import com.google.cloud.oslogin.common.OsLoginProto.SshPublicKey;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class UpdateSshPublicKey {

  public static void main(String[] args) throws IOException {
    String userId = "example-user-id";
    String fingerprintId = "example-fingerprint-id";
    updateSshPublicKey(userId, fingerprintId);
  }

  public static void updateSshPublicKey(String userId, String fingerprintId) throws IOException {
    try (OsLoginServiceClient client = OsLoginServiceClient.create()) {
      String name = String.format("users/%s/sshPublicKeys/%s", userId, fingerprintId);
      SshPublicKey sshPublicKey =
          SshPublicKey.newBuilder()
              .setExpirationTimeUsec(
                  TimeUnit.MILLISECONDS.toMicros(System.currentTimeMillis())
                      + TimeUnit.HOURS.toMicros(24))
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("expiration_time_usec").build();

      SshPublicKey response = client.updateSshPublicKey(name, sshPublicKey, updateMask);
      System.out.printf("Updated SSH public key expiration: %d%n", response.getExpirationTimeUsec());
    }
  }
}
// [END oslogin_v1_osloginservice_sshpublickey_update]
