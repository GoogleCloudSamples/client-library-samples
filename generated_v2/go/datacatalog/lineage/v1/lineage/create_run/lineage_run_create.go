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

// [START datalineage_v1_lineage_run_create]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	"cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// createRun creates a new lineage run under an existing process.
func createRun(ctx context.Context, w io.Writer, projectID string, locationID string, processID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/processes/%s", projectID, locationID, processID)
	run := &lineagepb.Run{
		DisplayName: "example-run",
		State:       lineagepb.Run_STARTED,
		StartTime:   timestamppb.Now(),
	}

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &lineagepb.CreateRunRequest{
		Parent: parent,
		Run:    run,
	}

	resp, err := client.CreateRun(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateRun failed: %w", err)
	}

	fmt.Fprintf(w, "Created lineage run: %s\n", resp.GetName())
	return nil
}

// [END datalineage_v1_lineage_run_create]
