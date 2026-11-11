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

package com.google.cloud.managedidentities.v1;

// [START managedidentities_v1_managedidentitiesservice_domain_get]
import com.google.cloud.managedidentities.v1.Domain;
import com.google.cloud.managedidentities.v1.DomainName;
import com.google.cloud.managedidentities.v1.GetDomainRequest;
import com.google.cloud.managedidentities.v1.ManagedIdentitiesServiceClient;
import java.io.IOException;

public class GetDomain {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String domainId = "example-domain-id";
    getDomain(projectId, locationId, domainId);
  }

  public static void getDomain(String projectId, String locationId, String domainId)
      throws Exception {
    try (ManagedIdentitiesServiceClient client = ManagedIdentitiesServiceClient.create()) {
      String name = DomainName.of(projectId, locationId, domainId).toString();
      GetDomainRequest request = GetDomainRequest.newBuilder().setName(name).build();

      Domain response = client.getDomain(request);
      System.out.println("Retrieved domain: " + response.getName());
      System.out.println("Domain state: " + response.getState());
      System.out.println("Domain FQDN: " + response.getFqdn());
    }
  }
}
// [END managedidentities_v1_managedidentitiesservice_domain_get]
