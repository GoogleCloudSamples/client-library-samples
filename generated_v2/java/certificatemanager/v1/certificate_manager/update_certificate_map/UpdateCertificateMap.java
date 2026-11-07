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

package com.google.cloud.certificatemanager.v1;

// [START certificatemanager_v1_certificatemanager_certificatemap_update]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateMap;
import com.google.cloud.certificatemanager.v1.CertificateMapName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateCertificateMap {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String certificateMapId = "example-certificate_map_id";
    updateCertificateMap(projectId, locationId, certificateMapId);
  }

  public static void updateCertificateMap(
      String projectId, String locationId, String certificateMapId) throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      CertificateMap certificateMap =
          CertificateMap.newBuilder()
              .setName(CertificateMapName.of(projectId, locationId, certificateMapId).toString())
              .setDescription("Updated certificate map description")
              .build();

      // Initiate the asynchronous operation to update the certificate map and wait for completion.
      CertificateMap result =
          client.updateCertificateMapAsync(certificateMap, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated certificate map: " + result.getName());
      System.out.println("Description: " + result.getDescription());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemap_update]
