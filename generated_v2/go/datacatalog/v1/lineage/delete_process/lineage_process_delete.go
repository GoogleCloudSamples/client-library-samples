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

// [START datacatalog_v1_lineage_process_delete]

import (
	"context"
	"fmt"
	"io"
	"os"

	lineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	"cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// deleteProcess deletes an existing lineage process.
func deleteProcess(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_LOCATION")
	}
	if location == "" {
		location = "us-central1"
	}

	processID := os.Getenv("PROCESS_ID")
	if processID == "" {
		processID = os.Getenv("LINEAGE_PROCESS_ID")
	}
	if processID == "" {
		processID = "example-process-id"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s", projectID, location, processID)
	if envName := os.Getenv("LINEAGE_PROCESS_NAME"); envName != "" {
		name = envName
	}

	client, err := lineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &lineagepb.DeleteProcessRequest{
		Name: name,
	}

	op, err := client.DeleteProcess(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteProcess: %w", err)
	}

	// Wait for the long-running operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted process: %s\n", name)
	return nil
}

// [END datacatalog_v1_lineage_process_delete]
