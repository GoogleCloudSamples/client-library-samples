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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_update]
import com.google.cloud.security.privateca.v1.CertificateAuthorityServiceClient;
import com.google.cloud.security.privateca.v1.CertificateTemplate;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateCertificateTemplate {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String certificateTemplateId = "example-certificate-template-id";
    updateCertificateTemplate(projectId, locationId, certificateTemplateId);
  }

  public static void updateCertificateTemplate(
      String projectId, String locationId, String certificateTemplateId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (CertificateAuthorityServiceClient client = CertificateAuthorityServiceClient.create()) {
      CertificateTemplate certificateTemplate =
          CertificateTemplate.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/certificateTemplates/%s",
                      projectId, locationId, certificateTemplateId))
              .setDescription("Updated certificate template description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      CertificateTemplate response =
          client
              .updateCertificateTemplateAsync(certificateTemplate, updateMask)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Updated certificate template: " + response.getName());
    }
  }
}
// [END privateca_v1_certificateauthorityservice_certificatetemplate_update]
