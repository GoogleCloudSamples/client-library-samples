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

package com.google.cloud.monitoring.v1;

// [START monitoring_v1_dashboardsservice_dashboard_update]
import com.google.cloud.monitoring.dashboard.v1.DashboardsServiceClient;
import com.google.monitoring.dashboard.v1.Dashboard;
import com.google.monitoring.dashboard.v1.DashboardName;
import com.google.monitoring.dashboard.v1.UpdateDashboardRequest;

public class UpdateDashboard {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String dashboardId = "example-dashboard_id";
    updateDashboard(projectId, dashboardId);
  }

  public static void updateDashboard(String projectId, String dashboardId) throws Exception {
    try (DashboardsServiceClient client = DashboardsServiceClient.create()) {
      String dashboardName = DashboardName.of(projectId, dashboardId).toString();

      // Retrieve existing dashboard to preserve server-managed fields such as etag
      Dashboard existingDashboard = client.getDashboard(dashboardName);

      // Perform read-modify-write flow because UpdateDashboard replaces the full resource
      Dashboard dashboard =
          existingDashboard.toBuilder()
              .setDisplayName("Updated Dashboard Title")
              .build();

      UpdateDashboardRequest request =
          UpdateDashboardRequest.newBuilder()
              .setDashboard(dashboard)
              .build();

      Dashboard response = client.updateDashboard(request);
      System.out.println("Updated dashboard: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
    }
  }
}
// [END monitoring_v1_dashboardsservice_dashboard_update]
