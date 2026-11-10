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

// [START datalineage_v1_lineage_lineageevent_create]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	"cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// createLineageEvent creates a new lineage event within a run.
func createLineageEvent(ctx context.Context, w io.Writer, projectID string, locationID string, processID string, runID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s", projectID, locationID, processID, runID)
	lineageEvent := &lineagepb.LineageEvent{
		StartTime: timestamppb.Now(),
		Links: []*lineagepb.EventLink{
			{
				Source: &lineagepb.EntityReference{
					FullyQualifiedName: "bigquery:example-project.dataset.source_table",
				},
				Target: &lineagepb.EntityReference{
					FullyQualifiedName: "bigquery:example-project.dataset.target_table",
				},
			},
		},
	}

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datalineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.CreateLineageEventRequest{
		Parent:       parent,
		LineageEvent: lineageEvent,
	}

	resp, err := client.CreateLineageEvent(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateLineageEvent: %w", err)
	}

	fmt.Fprintf(w, "Created lineage event: %s\n", resp.GetName())
	return nil
}

// [END datalineage_v1_lineage_lineageevent_create]
