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

package com.google.cloud.memorystore.v1;

// [START memorystore_v1_memorystore_sharedregionalcertificateauthority_get]
import com.google.cloud.memorystore.v1.MemorystoreClient;
import com.google.cloud.memorystore.v1.SharedRegionalCertificateAuthority;

public class GetSharedRegionalCertificateAuthority {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    getSharedRegionalCertificateAuthority(projectId, locationId);
  }

  public static void getSharedRegionalCertificateAuthority(String projectId, String locationId)
      throws Exception {
    try (MemorystoreClient client = MemorystoreClient.create()) {
      String name =
          String.format(
              "projects/%s/locations/%s/sharedRegionalCertificateAuthority", projectId, locationId);
      SharedRegionalCertificateAuthority response =
          client.getSharedRegionalCertificateAuthority(name);
      System.out.println("Certificate Authority Name: " + response.getName());
    }
  }
}
// [END memorystore_v1_memorystore_sharedregionalcertificateauthority_get]
