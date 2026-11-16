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

// [START certificatemanager_v1_certificatemanager_certificatemap_delete]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.CertificateMapName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class DeleteCertificateMap {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String certificateMapId = "example-certificate-map-id";
    deleteCertificateMap(projectId, locationId, certificateMapId);
  }

  public static void deleteCertificateMap(
      String projectId, String locationId, String certificateMapId)
      throws IOException, ExecutionException, InterruptedException {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String name = CertificateMapName.of(projectId, locationId, certificateMapId).toString();

      // Certificate maps containing entries cannot be deleted.
      // Delete any associated certificate map entries prior to initiating this operation.
      client.deleteCertificateMapAsync(name).get();
      System.out.println("Deleted certificate map: " + name);
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemap_delete]
