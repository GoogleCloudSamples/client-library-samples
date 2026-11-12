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

// [START contactcenterinsights_v1_contactcenterinsights_view_update]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.View;
import com.google.cloud.contactcenterinsights.v1.ViewName;
import com.google.protobuf.FieldMask;

public class UpdateView {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String viewId = "example-view-id";
    updateView(projectId, locationId, viewId);
  }

  public static void updateView(String projectId, String locationId, String viewId)
      throws Exception {
    // Initialize client with Application Default Credentials
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      View view =
          View.newBuilder()
              .setName(ViewName.of(projectId, locationId, viewId).toString())
              .setDisplayName("Updated View Display Name")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      View response = client.updateView(view, updateMask);
      System.out.println("Updated view: " + response.getName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_view_update]
