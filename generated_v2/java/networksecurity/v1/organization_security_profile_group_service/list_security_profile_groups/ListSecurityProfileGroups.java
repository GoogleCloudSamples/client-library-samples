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

package com.google.cloud.networksecurity.v1;

// [START networksecurity_v1_organizationsecurityprofilegroupservice_securityprofilegroups_list]
import com.google.cloud.networksecurity.v1.OrganizationSecurityProfileGroupServiceClient;
import com.google.cloud.networksecurity.v1.SecurityProfileGroup;

public class ListSecurityProfileGroups {

  public static void main(String[] args) throws Exception {
    String projectsOrganizationId = "example-projects_organization_id";
    String locationId = "example-location_id";
    listSecurityProfileGroups(projectsOrganizationId, locationId);
  }

  public static void listSecurityProfileGroups(String projectsOrganizationId, String locationId)
      throws Exception {
    try (OrganizationSecurityProfileGroupServiceClient client =
        OrganizationSecurityProfileGroupServiceClient.create()) {
      String parent =
          projectsOrganizationId.contains("/")
              ? String.format("%s/locations/%s", projectsOrganizationId, locationId)
              : String.format("organizations/%s/locations/%s", projectsOrganizationId, locationId);

      for (SecurityProfileGroup securityProfileGroup :
          client.listSecurityProfileGroups(parent).iterateAll()) {
        System.out.println("Security Profile Group: " + securityProfileGroup.getName());
      }
    }
  }
}
// [END networksecurity_v1_organizationsecurityprofilegroupservice_securityprofilegroups_list]
