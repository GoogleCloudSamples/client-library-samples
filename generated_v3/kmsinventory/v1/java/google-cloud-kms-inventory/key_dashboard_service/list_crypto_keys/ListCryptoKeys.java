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

package com.google.cloud.kmsinventory.v1;

// [START kmsinventory_v1_keydashboardservice_cryptokeys_list]
import com.google.cloud.kms.inventory.v1.KeyDashboardServiceClient;
import com.google.cloud.kms.v1.CryptoKey;
import java.io.IOException;

public class ListCryptoKeys {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    listCryptoKeys(projectId);
  }

  public static void listCryptoKeys(String projectId) throws IOException {
    try (KeyDashboardServiceClient client = KeyDashboardServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      for (CryptoKey cryptoKey : client.listCryptoKeys(parent).iterateAll()) {
        System.out.println("CryptoKey: " + cryptoKey.getName());
      }
    }
  }
}
// [END kmsinventory_v1_keydashboardservice_cryptokeys_list]
