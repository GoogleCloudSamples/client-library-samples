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

package com.google.cloud.servicehealth.v1;

// [START servicehealth_v1_servicehealth_organizationevents_list]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.servicehealth.v1.ListOrganizationEventsRequest;
import com.google.cloud.servicehealth.v1.OrganizationEvent;
import com.google.cloud.servicehealth.v1.ServiceHealthClient;
import java.io.IOException;

public class ListOrganizationEvents {

  public static void main(String[] args) throws IOException {
    String organizationId = "example-organization-id";
    String locationId = "global";
    listOrganizationEvents(organizationId, locationId);
  }

  public static void listOrganizationEvents(String organizationId, String locationId)
      throws IOException {
    if (organizationId == null || organizationId.isEmpty() || "null".equals(organizationId)) {
      organizationId = System.getenv("ORGANIZATION_ID");
    }
    if (organizationId == null || organizationId.isEmpty() || "null".equals(organizationId)) {
      System.out.println("Organization ID is required to list organization events.");
      return;
    }
    if (locationId == null || locationId.isEmpty()) {
      locationId = "global";
    }

    try (ServiceHealthClient client = ServiceHealthClient.create()) {
      String parent = String.format("organizations/%s/locations/%s", organizationId, locationId);
      ListOrganizationEventsRequest request =
          ListOrganizationEventsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (OrganizationEvent event : client.listOrganizationEvents(request).iterateAll()) {
        System.out.println("Event: " + event.getName());
        System.out.println("State: " + event.getState());
      }
    } catch (ApiException e) {
      System.out.println("Failed to list organization events: " + e.getMessage());
    }
  }
}
// [END servicehealth_v1_servicehealth_organizationevents_list]
