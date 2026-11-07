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

// [START certificatemanager_v1_certificatemanager_certificatemap_get]
import com.google.cloud.certificatemanager.v1.CertificateMap;
import com.google.cloud.certificatemanager.v1.CertificateMapName;
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import java.io.IOException;

public class GetCertificateMap {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String certificateMapId = "example-certificate_map_id";
    getCertificateMap(projectId, locationId, certificateMapId);
  }

  public static void getCertificateMap(
      String projectId, String locationId, String certificateMapId) throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String name = CertificateMapName.of(projectId, locationId, certificateMapId).toString();

      CertificateMap certificateMap = client.getCertificateMap(name);

      System.out.println("Certificate Map: " + certificateMap.getName());
      System.out.println("Description: " + certificateMap.getDescription());
      System.out.println("Create Time: " + certificateMap.getCreateTime().getSeconds());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_certificatemap_get]
