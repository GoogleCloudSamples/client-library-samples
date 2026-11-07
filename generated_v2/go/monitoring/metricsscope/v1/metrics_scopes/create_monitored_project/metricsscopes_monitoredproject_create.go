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

// [START monitoring_v1_metricsscopes_monitoredproject_create]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/metricsscope/apiv1"
	metricsscopepb "cloud.google.com/go/monitoring/metricsscope/apiv1/metricsscopepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createMonitoredProject adds a target project to the scoping project's Metrics Scope.
func createMonitoredProject(ctx context.Context, w io.Writer, metricsScopeID string, monitoredProjectID string) error {
	parent := fmt.Sprintf("locations/global/metricsScopes/%s", metricsScopeID)
	monitoredProject := &metricsscopepb.MonitoredProject{
		Name: fmt.Sprintf("locations/global/metricsScopes/%s/projects/%s", metricsScopeID, monitoredProjectID),
	}

	client, err := monitoring.NewMetricsScopesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricsScopesClient: %w", err)
	}
	defer client.Close()

	req := &metricsscopepb.CreateMonitoredProjectRequest{
		Parent:           parent,
		MonitoredProject: monitoredProject,
	}

	op, err := client.CreateMonitoredProject(ctx, req)
	if err != nil {
		if status.Code(err) == codes.AlreadyExists {
			fmt.Fprintf(w, "Created monitored project: %s\n", monitoredProject.GetName())
			return nil
		}
		return fmt.Errorf("CreateMonitoredProject: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.AlreadyExists {
			fmt.Fprintf(w, "Created monitored project: %s\n", monitoredProject.GetName())
			return nil
		}
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Created monitored project: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v1_metricsscopes_monitoredproject_create]
