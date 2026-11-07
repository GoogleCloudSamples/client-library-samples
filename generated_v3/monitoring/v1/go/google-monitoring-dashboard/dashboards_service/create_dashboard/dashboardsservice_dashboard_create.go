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

// [START monitoring_v1_dashboardsservice_dashboard_create]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/dashboard/apiv1"
	dashboardpb "cloud.google.com/go/monitoring/dashboard/apiv1/dashboardpb"
)

// createDashboard creates a new Cloud Monitoring dashboard in the specified project.
func createDashboard(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	dashboard := &dashboardpb.Dashboard{
		DisplayName: "Example Dashboard",
		Layout: &dashboardpb.Dashboard_GridLayout{
			GridLayout: &dashboardpb.GridLayout{},
		},
	}

	client, err := monitoring.NewDashboardsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDashboardsClient failed: %w", err)
	}
	defer client.Close()

	req := &dashboardpb.CreateDashboardRequest{
		Parent:    parent,
		Dashboard: dashboard,
	}

	resp, err := client.CreateDashboard(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDashboard: %w", err)
	}

	fmt.Fprintf(w, "Created dashboard: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v1_dashboardsservice_dashboard_create]
