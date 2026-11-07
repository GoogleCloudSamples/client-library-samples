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

package com.google.cloud.cloudresourcemanager.v3;

// [START cloudresourcemanager_v3_organizations_organizations_search]
import com.google.cloud.resourcemanager.v3.Organization;
import com.google.cloud.resourcemanager.v3.OrganizationsClient;
import com.google.cloud.resourcemanager.v3.SearchOrganizationsRequest;
import java.io.IOException;

public class SearchOrganizations {

  public static void main(String[] args) throws IOException {
    // Queries can filter by domain (for example, "domain:example.com") or directory customer ID.
    String query = "domain:example.com";
    searchOrganizations(query);
  }

  public static void searchOrganizations(String query) throws IOException {
    try (OrganizationsClient client = OrganizationsClient.create()) {
      SearchOrganizationsRequest request =
          SearchOrganizationsRequest.newBuilder()
              .setQuery(query)
              .build();

      for (Organization organization : client.searchOrganizations(request).iterateAll()) {
        System.out.println("Organization: " + organization.getName());
        System.out.println("Display name: " + organization.getDisplayName());
        System.out.println("Directory customer ID: " + organization.getDirectoryCustomerId());
        System.out.println("State: " + organization.getState());
      }
    }
  }
}
// [END cloudresourcemanager_v3_organizations_organizations_search]
