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

package com.google.cloud.domains.v1beta1;

// [START domains_v1beta1_domains_registrations_list]
import com.google.cloud.domains.v1beta1.DomainsClient;
import com.google.cloud.domains.v1beta1.Registration;
import java.io.IOException;

public class ListRegistrations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    listRegistrations(projectId, locationId);
  }

  public static void listRegistrations(String projectId, String locationId) throws Exception {
    try (DomainsClient client = DomainsClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Registration registration : client.listRegistrations(parent).iterateAll()) {
        System.out.println("Registration: " + registration.getName());
        System.out.println("Domain name: " + registration.getDomainName());
        System.out.println("State: " + registration.getState());
      }
    }
  }
}
// [END domains_v1beta1_domains_registrations_list]
