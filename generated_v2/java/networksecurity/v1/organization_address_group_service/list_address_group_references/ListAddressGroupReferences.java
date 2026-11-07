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

// [START networksecurity_v1_organizationaddressgroupservice_addressgroupreferences_list]
import com.google.cloud.networksecurity.v1.ListAddressGroupReferencesRequest;
import com.google.cloud.networksecurity.v1.ListAddressGroupReferencesResponse.AddressGroupReference;
import com.google.cloud.networksecurity.v1.OrganizationAddressGroupServiceClient;

public class ListAddressGroupReferences {

  public static void main(String[] args) throws Exception {
    String projectsOrganizationId = "example-organization-id";
    String locationId = "example-location-id";
    String addressGroupId = "example-address-group-id";
    listAddressGroupReferences(projectsOrganizationId, locationId, addressGroupId);
  }

  public static void listAddressGroupReferences(
      String projectsOrganizationId, String locationId, String addressGroupId) throws Exception {
    try (OrganizationAddressGroupServiceClient client =
        OrganizationAddressGroupServiceClient.create()) {
      String parent =
          projectsOrganizationId.startsWith("projects/")
                  || projectsOrganizationId.startsWith("organizations/")
              ? projectsOrganizationId
              : "organizations/" + projectsOrganizationId;
      String addressGroup =
          String.format("%s/locations/%s/addressGroups/%s", parent, locationId, addressGroupId);

      ListAddressGroupReferencesRequest request =
          ListAddressGroupReferencesRequest.newBuilder()
              .setAddressGroup(addressGroup)
              .build();

      for (AddressGroupReference reference :
          client.listAddressGroupReferences(request).iterateAll()) {
        System.out.printf(
            "Security policy: %s, Rule priority: %d%n",
            reference.getSecurityPolicy(), reference.getRulePriority());
      }
    }
  }
}
// [END networksecurity_v1_organizationaddressgroupservice_addressgroupreferences_list]
