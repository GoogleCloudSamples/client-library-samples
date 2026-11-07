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

// [START dataplex_v1_catalogservice_entries_search]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
)

// searchEntries searches metadata entries within a Dataplex catalog.
func searchEntries(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	query := "type=DATASET"

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.SearchEntriesRequest{
		Name:     name,
		Query:    query,
		PageSize: 10,
	}

	it := client.SearchEntries(ctx, req)
	// Limit results to prevent unbounded pagination during execution.
	for i := 0; i < 10; i++ {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchEntries iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Found entry: %s\n", resp.GetDataplexEntry().GetName())
	}

	return nil
}

// [END dataplex_v1_catalogservice_entries_search]
