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

// [START monitoring_v1_dashboardsservice_dashboard_delete]
import com.google.cloud.monitoring.dashboard.v1.DashboardsServiceClient;
import com.google.monitoring.dashboard.v1.DashboardName;
import com.google.monitoring.dashboard.v1.DeleteDashboardRequest;

public class DeleteDashboard {

  public static void main(String[] args) throws Exception {
    String dashboardId = "example-dashboard-id";
    String projectId = "example-project-id";
    deleteDashboard(dashboardId, projectId);
  }

  public static void deleteDashboard(String dashboardId, String projectId) throws Exception {
    try (DashboardsServiceClient client = DashboardsServiceClient.create()) {
      String name = DashboardName.of(projectId, dashboardId).toString();
      DeleteDashboardRequest request =
          DeleteDashboardRequest.newBuilder()
              .setName(name)
              .build();
      client.deleteDashboard(request);
      System.out.println("Deleted dashboard: " + name);
    }
  }
}
// [END monitoring_v1_dashboardsservice_dashboard_delete]
