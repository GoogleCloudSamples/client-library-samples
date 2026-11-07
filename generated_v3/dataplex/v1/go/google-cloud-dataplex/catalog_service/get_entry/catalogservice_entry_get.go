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

// [START dataplex_v1_catalogservice_entry_get]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// getEntry retrieves an existing entry in Dataplex Catalog.
func getEntry(ctx context.Context, w io.Writer, projectID string, locationID string, entryGroupID string, entryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/entryGroups/%s/entries/%s", projectID, locationID, entryGroupID, entryID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.GetEntryRequest{
		Name: name,
	}

	entry, err := client.GetEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("GetEntry failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved entry: %s\n", entry.GetName())
	fmt.Fprintf(w, "Entry type: %s\n", entry.GetEntryType())

	return nil
}

// [END dataplex_v1_catalogservice_entry_get]
