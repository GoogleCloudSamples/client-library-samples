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

package com.google.cloud.privateca.v1;

// [START privateca_v1_certificateauthorityservice_capool_get]
import com.google.cloud.security.privateca.v1.CaPool;
import com.google.cloud.security.privateca.v1.CaPoolName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import java.io.IOException;

public class GetCaPool {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    getCaPool(projectId, locationId, caPoolId);
  }

  public static void getCaPool(String projectId, String locationId, String caPoolId)
      throws IOException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name = CaPoolName.of(projectId, locationId, caPoolId).toString();

      CaPool response = client.getCaPool(name);

      System.out.println("Retrieved CA Pool: " + response.getName());
      System.out.println("Tier: " + response.getTier());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_capool_get]
