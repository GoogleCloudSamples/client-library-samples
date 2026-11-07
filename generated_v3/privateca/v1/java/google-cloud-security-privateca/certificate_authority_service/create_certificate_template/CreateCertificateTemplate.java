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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_create]
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateTemplate;
import com.google.cloud.security.privateca.v1.LocationName;
import java.util.concurrent.TimeUnit;

public class CreateCertificateTemplate {

  public static void createCertificateTemplate(
      String projectId, String locationId, String certificateTemplateId) throws Exception {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      CertificateTemplate certificateTemplate =
          CertificateTemplate.newBuilder()
              .setDescription("Example certificate template")
              .build();

      CertificateTemplate response =
          client
              .createCertificateTemplateAsync(parent, certificateTemplate, certificateTemplateId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Certificate template created: " + response.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificatetemplate_create]
