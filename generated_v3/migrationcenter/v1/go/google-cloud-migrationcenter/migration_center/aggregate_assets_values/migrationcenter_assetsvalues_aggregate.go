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

// [START migrationcenter_v1_migrationcenter_aggregate_assets_values]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// aggregateAssetsValues aggregates asset values in a Migration Center location.
func aggregateAssetsValues(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	aggregations := []*migrationcenterpb.Aggregation{
		{
			Field: "machine_details",
			AggregationFunction: &migrationcenterpb.Aggregation_Count_{
				Count: &migrationcenterpb.Aggregation_Count{},
			},
		},
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.AggregateAssetsValuesRequest{
		Parent:       parent,
		Aggregations: aggregations,
	}

	resp, err := client.AggregateAssetsValues(ctx, req)
	if err != nil {
		return fmt.Errorf("AggregateAssetsValues failed: %w", err)
	}

	for _, result := range resp.GetResults() {
		fmt.Fprintf(w, "Field: %s, Count: %d\n", result.GetField(), result.GetCount().GetValue())
	}

	return nil
}

// [END migrationcenter_v1_migrationcenter_aggregate_assets_values]
