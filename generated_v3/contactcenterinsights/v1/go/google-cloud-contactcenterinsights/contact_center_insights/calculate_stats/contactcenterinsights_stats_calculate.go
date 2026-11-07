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

// [START contactcenterinsights_v1_contactcenterinsights_calculate_stats]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// calculateStats calculates metadata and conversation statistics for a location.
// The location parameter must be formatted as "projects/{project_id}/locations/{location_id}".
func calculateStats(ctx context.Context, w io.Writer, location string) error {
	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.CalculateStatsRequest{
		Location: location,
	}

	resp, err := client.CalculateStats(ctx, req)
	if err != nil {
		return fmt.Errorf("CalculateStats: %w", err)
	}

	fmt.Fprintf(w, "Total conversations: %d\n", resp.GetConversationCount())
	fmt.Fprintf(w, "Average turn count: %d\n", resp.GetAverageTurnCount())
	if duration := resp.GetAverageDuration(); duration != nil {
		fmt.Fprintf(w, "Average duration: %v\n", duration.AsDuration())
	}

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_calculate_stats]
