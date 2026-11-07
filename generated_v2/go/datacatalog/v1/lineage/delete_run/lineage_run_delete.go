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

// [START datacatalog_v1_lineage_run_delete]

import (
	"context"
	"fmt"
	"io"
	"os"

	lineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// deleteRun deletes a lineage run.
func deleteRun(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = "us-central1"
	}
	processID := os.Getenv("PROCESS_ID")
	if processID == "" {
		processID = "example-process"
	}
	runID := os.Getenv("RUN_ID")
	if runID == "" {
		runID = "example-run"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s", projectID, location, processID, runID)

	client, err := lineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("lineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.DeleteRunRequest{
		Name:         name,
		AllowMissing: true,
	}

	op, err := client.DeleteRun(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteRun: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted lineage run: %s\n", name)
	return nil
}

// [END datacatalog_v1_lineage_run_delete]
