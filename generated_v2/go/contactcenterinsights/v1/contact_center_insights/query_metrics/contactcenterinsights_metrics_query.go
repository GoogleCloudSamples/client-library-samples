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

// [START contactcenterinsights_v1_contactcenterinsights_query_metrics]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// queryMetrics queries metrics in Contact Center Insights.
func queryMetrics(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	filter := `create_time >= "2024-01-01T00:00:00Z" AND create_time < "2024-01-02T00:00:00Z"`
	location := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.QueryMetricsRequest{
		Location: location,
		Filter:   filter,
	}

	op, err := client.QueryMetrics(ctx, req)
	if err != nil {
		return fmt.Errorf("QueryMetrics: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Query metrics operation completed. Slices count: %d\n", len(resp.GetSlices()))

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_query_metrics]
