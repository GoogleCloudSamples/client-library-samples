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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_create]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.DnsAuthorization;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateDnsAuthorization {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String dnsAuthorizationId = "example-dns-authorization-id";
    createDnsAuthorization(projectId, locationId, dnsAuthorizationId);
  }

  public static void createDnsAuthorization(
      String projectId, String locationId, String dnsAuthorizationId) throws Exception {
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      DnsAuthorization dnsAuthorization =
          DnsAuthorization.newBuilder()
              .setDomain("example.com")
              .setDescription("DNS authorization for example.com")
              .build();

      DnsAuthorization response =
          client.createDnsAuthorizationAsync(parent, dnsAuthorization, dnsAuthorizationId).get();

      System.out.println("Created DNS authorization: " + response.getName());
    }
  }
}
// [END certificatemanager_v1_certificatemanager_dnsauthorization_create]
