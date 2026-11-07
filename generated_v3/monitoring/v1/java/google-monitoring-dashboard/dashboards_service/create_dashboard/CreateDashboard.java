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

// [START monitoring_v1_dashboardsservice_dashboard_create]
import com.google.cloud.monitoring.dashboard.v1.DashboardsServiceClient;
import com.google.monitoring.dashboard.v1.Dashboard;
import com.google.monitoring.dashboard.v1.GridLayout;
import java.io.IOException;

public class CreateDashboard {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    createDashboard(projectId);
  }

  public static void createDashboard(String projectId) throws IOException {
    try (DashboardsServiceClient client = DashboardsServiceClient.create()) {
      String parent = "projects/" + projectId;
      Dashboard dashboard =
          Dashboard.newBuilder()
              .setDisplayName("Sample Dashboard")
              .setGridLayout(GridLayout.newBuilder().build())
              .build();

      Dashboard response = client.createDashboard(parent, dashboard);
      System.out.println("Created dashboard: " + response.getName());
    }
  }
}
// [END monitoring_v1_dashboardsservice_dashboard_create]
