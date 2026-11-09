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

// [START privateca_v1_certificateauthorityservice_fetch_ca_certs]
import com.google.cloud.security.privateca.v1.CaPoolName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.FetchCaCertsRequest;
import com.google.cloud.security.privateca.v1.FetchCaCertsResponse;
import java.io.IOException;

public class FetchCaCerts {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    fetchCaCerts(projectId, locationId, caPoolId);
  }

  public static void fetchCaCerts(String projectId, String locationId, String caPoolId)
      throws IOException {
    // Initialize client that sends requests. Create the client once to reuse across requests.
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String caPool = CaPoolName.format(projectId, locationId, caPoolId);

      FetchCaCertsRequest request =
          FetchCaCertsRequest.newBuilder()
              .setCaPool(caPool)
              .build();

      FetchCaCertsResponse response = client.fetchCaCerts(request);

      System.out.printf("Fetched %d certificate chains:%n", response.getCaCertsCount());
      for (FetchCaCertsResponse.CertChain certChain : response.getCaCertsList()) {
        for (String certificate : certChain.getCertificatesList()) {
          System.out.println(certificate);
        }
      }
    }
  }
}
// [END privateca_v1_certificateauthorityservice_fetch_ca_certs]
