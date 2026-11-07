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

// [START datalineage_v1_lineage_process_open_lineage_run_event]

import (
	"context"
	"fmt"
	"io"
	"os"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/structpb"
)

// processOpenLineageRunEvent processes an OpenLineage run event.
func processOpenLineageRunEvent(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	openLineage, err := structpb.NewStruct(map[string]any{
		"eventType": "START",
		"eventTime": "2025-01-01T00:00:00.000Z",
		"producer":  "https://example.com/producer",
		"schemaURL": "https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/RunEvent",
		"job": map[string]any{
			"namespace": "example-namespace",
			"name":      "example-job",
		},
		"run": map[string]any{
			"runId": "d46e465b-d358-4d32-83d4-7224e46308d6",
		},
	})
	if err != nil {
		return fmt.Errorf("structpb.NewStruct failed: %w", err)
	}

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &lineagepb.ProcessOpenLineageRunEventRequest{
		Parent:      parent,
		OpenLineage: openLineage,
	}

	resp, err := client.ProcessOpenLineageRunEvent(ctx, req)
	if err != nil {
		return fmt.Errorf("ProcessOpenLineageRunEvent failed: %w", err)
	}

	fmt.Fprintf(w, "OpenLineage run event processed: %v\n", resp)
	return nil
}

// [END datalineage_v1_lineage_process_open_lineage_run_event]
