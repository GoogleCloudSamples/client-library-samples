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

package com.google.cloud.domains.v1;

// [START domains_v1_domains_domains_search]
import com.google.cloud.domains.v1.DomainsClient;
import com.google.cloud.domains.v1.RegisterParameters;
import com.google.cloud.domains.v1.SearchDomainsResponse;
import java.io.IOException;

public class SearchDomains {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    // Cloud Domains API enforces locationId to be 'global'.
    String locationId = "global";
    String query = "example.com";
    searchDomains(projectId, locationId, query);
  }

  public static void searchDomains(String projectId, String locationId, String query) throws Exception {
    try (DomainsClient client = DomainsClient.create()) {
      String location = String.format("projects/%s/locations/%s", projectId, locationId);

      SearchDomainsResponse response = client.searchDomains(location, query);
      for (RegisterParameters registerParameters : response.getRegisterParametersList()) {
        System.out.printf(
            "Domain: %s, Availability: %s%n",
            registerParameters.getDomainName(),
            registerParameters.getAvailability());
      }
    }
  }
}
// [END domains_v1_domains_domains_search]
