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

// [START dataplex_v1_catalogservice_lookup_entry]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// lookupEntry demonstrates how to retrieve metadata for a Dataplex entry.
func lookupEntry(ctx context.Context, w io.Writer, projectID string, locationID string, entryGroupID string, entryID string) error {
	entry := fmt.Sprintf("projects/%s/locations/%s/entryGroups/%s/entries/%s", projectID, locationID, entryGroupID, entryID)
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.LookupEntryRequest{
		Name:  name,
		Entry: entry,
	}

	resp, err := client.LookupEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("LookupEntry failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved entry: %s\n", resp.GetName())

	return nil
}

// [END dataplex_v1_catalogservice_lookup_entry]
