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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_get]
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateTemplate;
import com.google.cloud.security.privateca.v1.CertificateTemplateName;
import java.io.IOException;

public class GetCertificateTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String certificateTemplateId = "example-certificate-template-id";
    getCertificateTemplate(projectId, locationId, certificateTemplateId);
  }

  public static void getCertificateTemplate(
      String projectId, String locationId, String certificateTemplateId) throws IOException {
    try (CertificateAuthorityServiceClient certificateAuthorityServiceClient =
        CertificateAuthorityServiceClient.create()) {
      String name =
          CertificateTemplateName.of(projectId, locationId, certificateTemplateId).toString();
      CertificateTemplate certificateTemplate =
          certificateAuthorityServiceClient.getCertificateTemplate(name);
      System.out.println("Certificate Template: " + certificateTemplate.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificatetemplate_get]
