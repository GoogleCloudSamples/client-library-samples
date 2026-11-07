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

// [START privateca_v1_certificateauthorityservice_capool_delete]
import com.google.cloud.security.privateca.v1.CaPoolName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteCaPool {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String caPoolId = "example-ca-pool-id";
    deleteCaPool(projectId, locationId, caPoolId);
  }

  public static void deleteCaPool(String projectId, String locationId, String caPoolId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String name = CaPoolName.of(projectId, locationId, caPoolId).toString();
      client.deleteCaPoolAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted CA pool: %s%n", name);
    }
  }
}
// [END privateca_v1_certificateauthorityservice_capool_delete]
