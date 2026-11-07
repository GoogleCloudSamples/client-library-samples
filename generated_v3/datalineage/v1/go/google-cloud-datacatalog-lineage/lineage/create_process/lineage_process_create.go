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

// [START datalineage_v1_lineage_process_create]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// createProcess creates a new Data Lineage process.
func createProcess(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	process := &lineagepb.Process{
		DisplayName: "example-lineage-process",
	}

	req := &lineagepb.CreateProcessRequest{
		Parent:  parent,
		Process: process,
	}

	resp, err := client.CreateProcess(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateProcess: %w", err)
	}

	fmt.Fprintf(w, "Created process: %s\n", resp.GetName())

	return nil
}

// [END datalineage_v1_lineage_process_create]
