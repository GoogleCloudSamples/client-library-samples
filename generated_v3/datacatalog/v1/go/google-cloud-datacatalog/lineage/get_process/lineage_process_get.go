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

// [START datacatalog_v1_lineage_process_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	datacatalog "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// getProcess retrieves a specific lineage process.
func getProcess(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = os.Getenv("LOCATION")
	}
	if location == "" {
		location = "us-central1"
	}

	processID := os.Getenv("LINEAGE_PROCESS_ID")
	if processID == "" {
		processID = os.Getenv("PROCESS_ID")
	}
	if processID == "" {
		processID = "example-process-id"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s", projectID, location, processID)
	if envName := os.Getenv("LINEAGE_PROCESS_NAME"); envName != "" {
		name = envName
	} else if envName := os.Getenv("PROCESS_NAME"); envName != "" {
		name = envName
	} else if envName := os.Getenv("LINEAGE_PROCESS"); envName != "" {
		name = envName
	}

	client, err := datacatalog.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datacatalog.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.GetProcessRequest{
		Name: name,
	}

	process, err := client.GetProcess(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProcess: %w", err)
	}

	fmt.Fprintf(w, "Retrieved process: %s\n", process.GetName())
	return nil
}

// [END datacatalog_v1_lineage_process_get]
