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

// [START monitoring_v1_metricsscopes_metricsscope_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	monitoring "cloud.google.com/go/monitoring/metricsscope/apiv1"
	"cloud.google.com/go/monitoring/metricsscope/apiv1/metricsscopepb"
)

// getMetricsScope retrieves the specified metrics scope.
func getMetricsScope(ctx context.Context, w io.Writer) error {
	scopingProjectIDOrNumber := "example-scoping-project"
	if envProject := os.Getenv("GOOGLE_CLOUD_PROJECT"); envProject != "" {
		scopingProjectIDOrNumber = envProject
	} else if envProject := os.Getenv("PROJECT_ID"); envProject != "" {
		scopingProjectIDOrNumber = envProject
	}

	name := fmt.Sprintf("locations/global/metricsScopes/%s", scopingProjectIDOrNumber)

	client, err := monitoring.NewMetricsScopesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetricsScopesClient: %w", err)
	}
	defer client.Close()

	req := &metricsscopepb.GetMetricsScopeRequest{
		Name: name,
	}

	scope, err := client.GetMetricsScope(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMetricsScope: %w", err)
	}

	fmt.Fprintf(w, "Retrieved metrics scope: %s\n", scope.GetName())

	return nil
}

// [END monitoring_v1_metricsscopes_metricsscope_get]
