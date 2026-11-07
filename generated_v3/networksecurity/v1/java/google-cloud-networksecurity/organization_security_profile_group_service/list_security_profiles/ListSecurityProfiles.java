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

// [START networksecurity_v1_organizationsecurityprofilegroupservice_securityprofiles_list]
import com.google.cloud.networksecurity.v1.ListSecurityProfilesRequest;
import com.google.cloud.networksecurity.v1.OrganizationSecurityProfileGroupServiceClient;
import com.google.cloud.networksecurity.v1.SecurityProfile;

public class ListSecurityProfiles {

  public static void main(String[] args) throws Exception {
    String projectsOrganizationId = "example-projects_organization_id";
    String locationId = "example-location_id";
    listSecurityProfiles(projectsOrganizationId, locationId);
  }

  public static void listSecurityProfiles(String projectsOrganizationId, String locationId)
      throws Exception {
    // Initialize client within try-with-resources to ensure automatic cleanup
    try (OrganizationSecurityProfileGroupServiceClient client =
        OrganizationSecurityProfileGroupServiceClient.create()) {
      String parent =
          projectsOrganizationId.startsWith("organizations/")
                  || projectsOrganizationId.startsWith("projects/")
              ? String.format("%s/locations/%s", projectsOrganizationId, locationId)
              : String.format("organizations/%s/locations/%s", projectsOrganizationId, locationId);

      ListSecurityProfilesRequest request =
          ListSecurityProfilesRequest.newBuilder().setParent(parent).build();

      for (SecurityProfile securityProfile : client.listSecurityProfiles(request).iterateAll()) {
        System.out.println("Security Profile name: " + securityProfile.getName());
        System.out.println("Security Profile type: " + securityProfile.getType());
      }
    }
  }
}
// [END networksecurity_v1_organizationsecurityprofilegroupservice_securityprofiles_list]
