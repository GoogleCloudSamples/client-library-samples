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

// [START privateca_v1_certificateauthorityservice_capool_update]
import com.google.cloud.security.privateca.v1.CaPool;
import com.google.cloud.security.privateca.v1.CaPoolName;
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateCaPool {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String caPoolId = "example-ca_pool_id";
    updateCaPool(projectId, locationId, caPoolId);
  }

  public static void updateCaPool(String projectId, String locationId, String caPoolId) throws Exception {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      // Define the CA pool resource with updated labels.
      CaPool caPool =
          CaPool.newBuilder()
              .setName(CaPoolName.of(projectId, locationId, caPoolId).toString())
              .putLabels("env", "test")
              .build();

      // Target only the labels field to avoid unintended field overwrites.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      // Wait for the long-running operation to complete.
      CaPool response = client.updateCaPoolAsync(caPool, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated CA pool: " + response.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_capool_update]
