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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
import com.google.cloud.gdchardwaremanagement.v1alpha.Contact;
import com.google.cloud.gdchardwaremanagement.v1alpha.GDCHardwareManagementClient;
import com.google.cloud.gdchardwaremanagement.v1alpha.LocationName;
import com.google.cloud.gdchardwaremanagement.v1alpha.Order;
import com.google.cloud.gdchardwaremanagement.v1alpha.OrganizationContact;
import com.google.type.PostalAddress;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateOrder {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String orderId = "example-order-id";
    createOrder(projectId, locationId, orderId);
  }

  public static void createOrder(String projectId, String locationId, String orderId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (GDCHardwareManagementClient client = GDCHardwareManagementClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      PostalAddress address =
          PostalAddress.newBuilder()
              .setRegionCode("US")
              .addAddressLines("1600 Amphitheatre Pkwy")
              .setLocality("Mountain View")
              .setAdministrativeArea("CA")
              .setPostalCode("94043")
              .build();

      Contact contact =
          Contact.newBuilder()
              .setGivenName("Jane")
              .setFamilyName("Doe")
              .setEmail("jane.doe@example.com")
              .setPhone("+1-555-0100")
              .build();

      OrganizationContact organizationContact =
          OrganizationContact.newBuilder()
              .setAddress(address)
              .addContacts(contact)
              .build();

      Order order =
          Order.newBuilder()
              .setDisplayName("Example Hardware Order")
              .setOrganizationContact(organizationContact)
              .setCustomerMotivation("Infrastructure expansion for edge workloads.")
              .setRegionCode("US")
              .build();

      Order response = client.createOrderAsync(parent, order, orderId).get(5, TimeUnit.MINUTES);

      System.out.println("Order created successfully: " + response.getName());
    }
  }
}
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
