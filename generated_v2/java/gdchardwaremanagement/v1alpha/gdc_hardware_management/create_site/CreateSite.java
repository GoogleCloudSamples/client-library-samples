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

package com.google.cloud.gdchardwaremanagement.v1alpha;

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
import com.google.cloud.gdchardwaremanagement.v1alpha.Contact;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.OrganizationContact;
import com.google.cloud.gdchardwaremanagement.v1alpha.Site;
import com.google.type.PostalAddress;
import java.util.concurrent.TimeUnit;

public class CreateSite {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String siteId = "example-site-id";
    createSite(projectId, locationId, siteId);
  }

  public static void createSite(String projectId, String locationId, String siteId)
      throws Exception {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      PostalAddress address =
          PostalAddress.newBuilder()
              .setRegionCode("US")
              .setAdministrativeArea("CA")
              .setLocality("Mountain View")
              .setPostalCode("94043")
              .addAddressLines("1600 Amphitheatre Pkwy")
              .build();

      Contact contact =
          Contact.newBuilder()
              .setGivenName("Alex")
              .setEmail("alex@example.com")
              .setPhone("+16505550123")
              .build();

      OrganizationContact organizationContact =
          OrganizationContact.newBuilder()
              .setAddress(address)
              .addContacts(contact)
              .build();

      Site site =
          Site.newBuilder()
              .setDisplayName("Example Site")
              .setDescription("Example site description")
              .setOrganizationContact(organizationContact)
              .build();

      Site response = client.createSiteAsync(parent, site, siteId).get(10, TimeUnit.MINUTES);
      System.out.println("Created site: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
