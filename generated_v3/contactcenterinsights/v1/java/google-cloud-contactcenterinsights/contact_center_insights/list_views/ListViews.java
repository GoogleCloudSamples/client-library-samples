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

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_views_list]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.LocationName;
import com.google.cloud.contactcenterinsights.v1.View;

public class ListViews {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listViews(projectId, locationId);
  }

  public static void listViews(String projectId, String locationId) throws Exception {
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (View view : client.listViews(parent).iterateAll()) {
        System.out.printf("View Name: %s%n", view.getName());
        System.out.printf("Display Name: %s%n", view.getDisplayName());
        System.out.printf("Filter Value: %s%n", view.getValue());
      }
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_views_list]
