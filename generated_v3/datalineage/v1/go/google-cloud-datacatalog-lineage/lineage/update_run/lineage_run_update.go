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

// [START datalineage_v1_lineage_run_update]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// updateRun updates an existing lineage run's display name.
func updateRun(ctx context.Context, w io.Writer, projectID string, locationID string, processID string, runID string) error {
	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	run := &lineagepb.Run{
		Name:        fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s", projectID, locationID, processID, runID),
		DisplayName: "Updated Run Display Name",
		StartTime:   timestamppb.Now(),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &lineagepb.UpdateRunRequest{
		Run:        run,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateRun(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateRun failed: %w", err)
	}

	fmt.Fprintf(w, "Updated run: %s\n", resp.GetName())
	return nil
}

// [END datalineage_v1_lineage_run_update]
