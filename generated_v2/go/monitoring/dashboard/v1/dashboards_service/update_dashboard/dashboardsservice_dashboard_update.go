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

package main

// [START monitoring_v1_dashboardsservice_dashboard_update]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/dashboard/apiv1"
	"cloud.google.com/go/monitoring/dashboard/apiv1/dashboardpb"
)

// updateDashboard updates an existing Cloud Monitoring dashboard.
func updateDashboard(ctx context.Context, w io.Writer, projectID string, dashboardID string) error {
	client, err := monitoring.NewDashboardsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDashboardsClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/dashboards/%s", projectID, dashboardID)

	// DashboardsService.UpdateDashboard performs a full resource replacement without an update mask.
	// Retrieve the existing dashboard first to preserve its configuration and etag.
	dashboard, err := client.GetDashboard(ctx, &dashboardpb.GetDashboardRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("client.GetDashboard: %w", err)
	}

	dashboard.DisplayName = fmt.Sprintf("%s (Updated)", dashboard.GetDisplayName())

	req := &dashboardpb.UpdateDashboardRequest{
		Dashboard: dashboard,
	}

	updated, err := client.UpdateDashboard(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateDashboard: %w", err)
	}

	fmt.Fprintf(w, "Updated dashboard: %s\n", updated.GetName())
	return nil
}

// [END monitoring_v1_dashboardsservice_dashboard_update]
