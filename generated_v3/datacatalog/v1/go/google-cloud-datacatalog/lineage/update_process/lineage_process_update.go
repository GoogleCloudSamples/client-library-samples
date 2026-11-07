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

// [START datacatalog_v1_lineage_process_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	lineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	"cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateProcess updates the metadata of an existing lineage process.
func updateProcess(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	processID := os.Getenv("LINEAGE_PROCESS_ID")
	if processID == "" {
		processID = "example-process-id"
	}

	process := &lineagepb.Process{
		Name:        fmt.Sprintf("projects/%s/locations/%s/processes/%s", projectID, location, processID),
		DisplayName: "Updated Process Display Name",
	}

	client, err := lineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("lineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.UpdateProcessRequest{
		Process: process,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"display_name"},
		},
		AllowMissing: true,
	}

	resp, err := client.UpdateProcess(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateProcess: %w", err)
	}

	fmt.Fprintf(w, "Updated process: %s\n", resp.GetName())
	return nil
}

// [END datacatalog_v1_lineage_process_update]
