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

// [START certificatemanager_v1_certificatemanager_dnsauthorizations_list]
import com.google.cloud.certificatemanager.v1.CertificateManagerClient;
import com.google.cloud.certificatemanager.v1.DnsAuthorization;
import com.google.cloud.certificatemanager.v1.LocationName;
import java.io.IOException;

public class ListDnsAuthorizations {

  public static void listDnsAuthorizations(String projectId, String locationId) throws IOException {
    // Initialize the client. The client can be reused across requests.
    try (CertificateManagerClient client = CertificateManagerClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (DnsAuthorization dnsAuthorization : client.listDnsAuthorizations(parent).iterateAll()) {
        System.out.println("DNS Authorization name: " + dnsAuthorization.getName());
        System.out.println("Domain: " + dnsAuthorization.getDomain());
      }
    }
  }
}
// [END certificatemanager_v1_certificatemanager_dnsauthorizations_list]
