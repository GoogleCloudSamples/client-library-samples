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

// [START capacityplanner_v1beta_usageservice_query_usage_histories]

import (
	"context"
	"fmt"
	"io"

	capacityplanner "cloud.google.com/go/capacityplanner/apiv1beta"
	capacityplannerpb "cloud.google.com/go/capacityplanner/apiv1beta/capacityplannerpb"
)

// queryUsageHistories queries capacity usage histories for a specified resource type.
func queryUsageHistories(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	cloudResourceType := "gce-vcpus"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := capacityplanner.NewUsageClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUsageClient: %w", err)
	}
	defer client.Close()

	req := &capacityplannerpb.QueryUsageHistoriesRequest{
		Parent:            parent,
		CloudResourceType: cloudResourceType,
	}

	resp, err := client.QueryUsageHistories(ctx, req)
	if err != nil {
		return fmt.Errorf("QueryUsageHistories: %w", err)
	}

	for _, history := range resp.GetUsageHistories() {
		fmt.Fprintf(w, "Usage history: %v\n", history)
	}

	return nil
}

// [END capacityplanner_v1beta_usageservice_query_usage_histories]
