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

// [START datalineage_v1_lineage_run_get]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// getRun retrieves a specific lineage run by its resource name.
func getRun(ctx context.Context, w io.Writer, projectID string, locationID string, processID string, runID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s", projectID, locationID, processID, runID)

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &lineagepb.GetRunRequest{
		Name: name,
	}

	run, err := client.GetRun(ctx, req)
	if err != nil {
		return fmt.Errorf("GetRun: %w", err)
	}

	fmt.Fprintf(w, "Retrieved run: %s\n", run.GetName())
	return nil
}

// [END datalineage_v1_lineage_run_get]
