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

// [START contactcenterinsights_v1_contactcenterinsights_view_delete]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.ViewName;

public class DeleteView {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String viewId = "example-view_id";
    deleteView(projectId, locationId, viewId);
  }

  public static void deleteView(String projectId, String locationId, String viewId)
      throws Exception {
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String name = ViewName.of(projectId, locationId, viewId).toString();

      client.deleteView(name);
      System.out.println("View deleted successfully: " + name);
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_view_delete]
