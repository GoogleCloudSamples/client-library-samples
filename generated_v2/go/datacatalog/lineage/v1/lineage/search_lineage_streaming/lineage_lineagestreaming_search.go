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

// [START datalineage_v1_lineage_lineagestreaming_search]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// searchLineageStreaming retrieves lineage links downstream from a specified entity.
func searchLineageStreaming(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	direction := lineagepb.SearchLineageStreamingRequest_DOWNSTREAM

	entityRef := &lineagepb.EntityReference{
		FullyQualifiedName: fmt.Sprintf("bigquery:%s.example_dataset.example_table", projectID),
	}
	multiRef := &lineagepb.MultipleEntityReference{
		Entities: []*lineagepb.EntityReference{entityRef},
	}
	rootCriteria := &lineagepb.SearchLineageStreamingRequest_RootCriteria{
		Criteria: &lineagepb.SearchLineageStreamingRequest_RootCriteria_Entities{
			Entities: multiRef,
		},
	}
	locations := []string{locationID}

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datalineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.SearchLineageStreamingRequest{
		Parent:       parent,
		Direction:    direction,
		RootCriteria: rootCriteria,
		Locations:    locations,
	}

	stream, err := client.SearchLineageStreaming(ctx, req)
	if err != nil {
		return fmt.Errorf("SearchLineageStreaming: %w", err)
	}

	var linkCount int
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv: %w", err)
		}

		for _, link := range resp.GetLinks() {
			fmt.Fprintf(w, "Link source: %s\n", link.GetSource().GetFullyQualifiedName())
			fmt.Fprintf(w, "Link target: %s\n", link.GetTarget().GetFullyQualifiedName())
			linkCount++
		}
	}

	fmt.Fprintf(w, "SearchLineageStreaming completed. Total links found: %d\n", linkCount)

	return nil
}

// [END datalineage_v1_lineage_lineagestreaming_search]
