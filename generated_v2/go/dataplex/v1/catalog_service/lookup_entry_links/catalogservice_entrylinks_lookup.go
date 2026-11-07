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

// [START dataplex_v1_catalogservice_lookup_entry_links]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
)

// lookupEntryLinks retrieves entry links referencing the specified entry.
func lookupEntryLinks(ctx context.Context, w io.Writer, locationID string, entryGroupID string, entryID string, projectID string) error {
	entry := fmt.Sprintf("projects/%s/locations/%s/entryGroups/%s/entries/%s", projectID, locationID, entryGroupID, entryID)
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.LookupEntryLinksRequest{
		Name:  name,
		Entry: entry,
	}

	it := client.LookupEntryLinks(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("LookupEntryLinks: %w", err)
		}
		fmt.Fprintf(w, "Entry link: %s\n", resp.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintln(w, "No entry links found.")
	}

	return nil
}

// [END dataplex_v1_catalogservice_lookup_entry_links]
