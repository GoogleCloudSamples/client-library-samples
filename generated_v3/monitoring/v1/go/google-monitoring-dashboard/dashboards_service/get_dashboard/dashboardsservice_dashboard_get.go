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

// [START monitoring_v1_dashboardsservice_dashboard_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/dashboard/apiv1"
	"cloud.google.com/go/monitoring/dashboard/apiv1/dashboardpb"
)

// getDashboard retrieves an existing Cloud Monitoring dashboard by its resource name.
func getDashboard(ctx context.Context, w io.Writer, dashboardID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/dashboards/%s", projectID, dashboardID)

	client, err := monitoring.NewDashboardsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDashboardsClient: %w", err)
	}
	defer client.Close()

	req := &dashboardpb.GetDashboardRequest{
		Name: name,
	}

	dashboard, err := client.GetDashboard(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDashboard: %w", err)
	}

	fmt.Fprintf(w, "Retrieved dashboard: %s\n", dashboard.GetName())
	fmt.Fprintf(w, "Display name: %s\n", dashboard.GetDisplayName())

	return nil
}

// [END monitoring_v1_dashboardsservice_dashboard_get]
