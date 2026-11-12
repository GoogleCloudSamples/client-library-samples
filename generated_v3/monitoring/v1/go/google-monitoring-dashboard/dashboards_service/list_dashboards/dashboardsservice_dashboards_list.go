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

// [START monitoring_v1_dashboardsservice_dashboards_list]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/dashboard/apiv1"
	"cloud.google.com/go/monitoring/dashboard/apiv1/dashboardpb"
	"google.golang.org/api/iterator"
)

// listDashboards lists Cloud Monitoring dashboards in a specified project.
func listDashboards(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := monitoring.NewDashboardsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDashboardsClient: %w", err)
	}
	defer client.Close()

	req := &dashboardpb.ListDashboardsRequest{
		Parent: parent,
	}

	it := client.ListDashboards(ctx, req)
	for {
		dashboard, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListDashboards iteration: %w", err)
		}
		fmt.Fprintf(w, "Dashboard: %s (%s)\n", dashboard.GetDisplayName(), dashboard.GetName())
	}

	return nil
}

// [END monitoring_v1_dashboardsservice_dashboards_list]
