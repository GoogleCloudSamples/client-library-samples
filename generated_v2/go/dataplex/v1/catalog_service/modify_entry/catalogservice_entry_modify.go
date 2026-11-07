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

// [START dataplex_v1_catalogservice_modify_entry]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// modifyEntry updates the description of a Dataplex catalog entry.
func modifyEntry(ctx context.Context, w io.Writer, projectID string, locationID string, entryGroupID string, entryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	entry := &dataplexpb.Entry{
		Name: fmt.Sprintf("projects/%s/locations/%s/entryGroups/%s/entries/%s", projectID, locationID, entryGroupID, entryID),
		EntrySource: &dataplexpb.EntrySource{
			Description: "Updated description for Dataplex entry",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"entry_source.description"},
	}

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.ModifyEntryRequest{
		Name:       name,
		Entry:      entry,
		UpdateMask: updateMask,
	}

	resp, err := client.ModifyEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("ModifyEntry: %w", err)
	}

	fmt.Fprintf(w, "Modified entry: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_catalogservice_modify_entry]
