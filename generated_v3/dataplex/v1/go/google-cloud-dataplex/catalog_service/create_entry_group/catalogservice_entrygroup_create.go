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

// [START dataplex_v1_catalogservice_entrygroup_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// Use the CreateEntryGroup method.
func createEntryGroup(ctx context.Context, w io.Writer, locationID string, entryGroupID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	entryGroup := &dataplexpb.EntryGroup{
		DisplayName: "Example Entry Group",
		Description: "Entry group created for catalog entries",
	}

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateEntryGroupRequest{
		Parent:       parent,
		EntryGroupId: entryGroupID,
		EntryGroup:   entryGroup,
	}

	op, err := client.CreateEntryGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEntryGroup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created entry group: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_catalogservice_entrygroup_create]
