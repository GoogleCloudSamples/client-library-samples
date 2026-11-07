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

// [START monitoring_v1_metricsscopes_metricsscopesbymonitoredproject_list]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/metricsscope/apiv1"
	"cloud.google.com/go/monitoring/metricsscope/apiv1/metricsscopepb"
)

// listMetricsScopesByMonitoredProject lists metrics scopes that monitor a given project.
func listMetricsScopesByMonitoredProject(ctx context.Context, w io.Writer, projectID string) error {
	monitoredResourceContainer := fmt.Sprintf("projects/%s", projectID)

	client, err := monitoring.NewMetricsScopesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricsScopesClient failed: %w", err)
	}
	defer client.Close()

	req := &metricsscopepb.ListMetricsScopesByMonitoredProjectRequest{
		MonitoredResourceContainer: monitoredResourceContainer,
	}

	resp, err := client.ListMetricsScopesByMonitoredProject(ctx, req)
	if err != nil {
		return fmt.Errorf("ListMetricsScopesByMonitoredProject: %w", err)
	}

	for _, scope := range resp.GetMetricsScopes() {
		fmt.Fprintf(w, "Metrics scope: %s\n", scope.GetName())
	}

	return nil
}

// [END monitoring_v1_metricsscopes_metricsscopesbymonitoredproject_list]
