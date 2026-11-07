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

package com.google.cloud.networksecurity.v1beta1;

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_create]
import com.google.cloud.networksecurity.v1beta1.CertificateProvider;
import com.google.cloud.networksecurity.v1beta1.CertificateProviderInstance;
import com.google.cloud.networksecurity.v1beta1.NetworkSecurityClient;
import com.google.cloud.networksecurity.v1beta1.ServerTlsPolicy;
import java.util.concurrent.TimeUnit;

public class CreateServerTlsPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String serverTlsPolicyId = "example-server-tls-policy-id";
    createServerTlsPolicy(projectId, locationId, serverTlsPolicyId);
  }

  public static void createServerTlsPolicy(
      String projectId, String locationId, String serverTlsPolicyId) throws Exception {
    try (NetworkSecurityClient client = NetworkSecurityClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      CertificateProviderInstance certificateProviderInstance =
          CertificateProviderInstance.newBuilder()
              .setPluginInstance("google_cloud_private_spiffe")
              .build();

      CertificateProvider serverCertificate =
          CertificateProvider.newBuilder()
              .setCertificateProviderInstance(certificateProviderInstance)
              .build();

      ServerTlsPolicy serverTlsPolicy =
          ServerTlsPolicy.newBuilder()
              .setDescription("Example Server TLS policy")
              .setServerCertificate(serverCertificate)
              .build();

      ServerTlsPolicy response =
          client
              .createServerTlsPolicyAsync(parent, serverTlsPolicy, serverTlsPolicyId)
              .get(5, TimeUnit.MINUTES);

      System.out.println("Created Server TLS policy: " + response.getName());
    }
  }
}
// [END networksecurity_v1beta1_networksecurity_servertlspolicy_create]
