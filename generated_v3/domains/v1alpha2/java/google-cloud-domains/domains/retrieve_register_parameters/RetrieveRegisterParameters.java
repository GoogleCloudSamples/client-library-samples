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

package com.google.cloud.domains.v1alpha2;

// [START domains_v1alpha2_domains_retrieve_register_parameters]
import com.google.cloud.domains.v1alpha2.DomainsClient;
import com.google.cloud.domains.v1alpha2.RetrieveRegisterParametersRequest;
import com.google.cloud.domains.v1alpha2.RetrieveRegisterParametersResponse;

public class RetrieveRegisterParameters {

  public static void main(String[] args) throws Exception {
    // Cloud Domains is a global resource.
    String projectId = "example-project-id";
    String locationId = "global";
    String domainName = "example.com";
    retrieveRegisterParameters(projectId, locationId, domainName);
  }

  public static void retrieveRegisterParameters(
      String projectId, String locationId, String domainName) throws Exception {
    try (DomainsClient client = DomainsClient.create()) {
      String location = String.format("projects/%s/locations/%s", projectId, locationId);

      RetrieveRegisterParametersRequest request =
          RetrieveRegisterParametersRequest.newBuilder()
              .setLocation(location)
              .setDomainName(domainName)
              .build();

      RetrieveRegisterParametersResponse response = client.retrieveRegisterParameters(request);

      System.out.println("Domain name: " + response.getRegisterParameters().getDomainName());
      System.out.println("Availability: " + response.getRegisterParameters().getAvailability());
    }
  }
}
// [END domains_v1alpha2_domains_retrieve_register_parameters]
