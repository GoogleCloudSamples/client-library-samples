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

// [START datalineage_v1_lineage_lineageevent_get]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// getLineageEvent retrieves an existing lineage event.
func getLineageEvent(ctx context.Context, w io.Writer, projectID string, locationID string, processID string, runID string, lineageEventID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s/runs/%s/lineageEvents/%s", projectID, locationID, processID, runID, lineageEventID)

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &lineagepb.GetLineageEventRequest{
		Name: name,
	}

	event, err := client.GetLineageEvent(ctx, req)
	if err != nil {
		return fmt.Errorf("GetLineageEvent: %w", err)
	}

	fmt.Fprintf(w, "Retrieved lineage event: %s\n", event.GetName())

	return nil
}

// [END datalineage_v1_lineage_lineageevent_get]
