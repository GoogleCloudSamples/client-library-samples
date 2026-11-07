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

// [START oslogin_v1_osloginservice_loginprofile_get]
import com.google.cloud.oslogin.v1.LoginProfile;
import com.google.cloud.oslogin.v1.OsLoginServiceClient;
import com.google.cloud.oslogin.v1.UserName;
import java.io.IOException;

public class GetLoginProfile {

  public static void main(String[] args) throws IOException {
    // The unique user ID or email address of the target Google account.
    String userId = "example-user-id";
    getLoginProfile(userId);
  }

  public static void getLoginProfile(String userId) throws IOException {
    // Initialize the client using Application Default Credentials (ADC).
    try (OsLoginServiceClient client = OsLoginServiceClient.create()) {
      String name = UserName.of(userId).toString();

      LoginProfile response = client.getLoginProfile(name);

      System.out.println("Retrieved login profile: " + response.getName());
      System.out.println("POSIX accounts count: " + response.getPosixAccountsCount());
      System.out.println("SSH public keys count: " + response.getSshPublicKeysCount());
    }
  }
}
// [END oslogin_v1_osloginservice_loginprofile_get]
