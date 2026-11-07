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

// [START datacatalog_v1_lineage_run_update]

import (
	"context"
	"fmt"
	"io"

	lineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// updateRun updates the state and display name of an existing lineage run.
func updateRun(ctx context.Context, w io.Writer, projectID string, locationID string, processID string, runID string) error {
	client, err := lineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("lineage.NewClient: %w", err)
	}
	defer client.Close()

	run := &lineagepb.Run{
		Name:        fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s", projectID, locationID, processID, runID),
		DisplayName: "Updated Run",
		State:       lineagepb.Run_COMPLETED,
		StartTime:   timestamppb.Now(),
		EndTime:     timestamppb.Now(),
	}

	req := &lineagepb.UpdateRunRequest{
		Run: run,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"display_name", "state"},
		},
	}

	res, err := client.UpdateRun(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateRun: %w", err)
	}

	fmt.Fprintf(w, "Updated run: %s\n", res.GetName())
	return nil
}

// [END datacatalog_v1_lineage_run_update]
