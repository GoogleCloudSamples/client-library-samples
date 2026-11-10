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

// [START dataplex_v1_catalogservice_entry_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// createEntry creates an entry in an entry group.
func createEntry(ctx context.Context, w io.Writer, projectID string, locationID string, entryGroupID string, entryID string, entryTypeID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/entryGroups/%s", projectID, locationID, entryGroupID)
	entry := &dataplexpb.Entry{
		EntryType: fmt.Sprintf("projects/%s/locations/%s/entryTypes/%s", projectID, locationID, entryTypeID),
		EntrySource: &dataplexpb.EntrySource{
			DisplayName: "Example Entry",
			Description: "An example Dataplex catalog entry",
		},
	}

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateEntryRequest{
		Parent:  parent,
		EntryId: entryID,
		Entry:   entry,
	}

	createdEntry, err := client.CreateEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEntry failed: %w", err)
	}

	fmt.Fprintf(w, "Created entry: %s\n", createdEntry.GetName())
	return nil
}

// [END dataplex_v1_catalogservice_entry_create]
