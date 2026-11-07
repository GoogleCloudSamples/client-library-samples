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

// [START privateca_v1_certificateauthorityservice_capools_list]
import com.google.cloud.security.privateca.v1.CaPool;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.LocationName;
import java.io.IOException;

public class ListCaPools {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listCaPools(projectId, locationId);
  }

  public static void listCaPools(String projectId, String locationId) throws IOException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (CaPool caPool : client.listCaPools(parent).iterateAll()) {
        System.out.println("CA Pool: " + caPool.getName());
      }
    }
  }
}
// [END privateca_v1_certificateauthorityservice_capools_list]
