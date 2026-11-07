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

// [START dataplex_v1_catalogservice_entrytype_delete]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// Use the DeleteEntryType method.
func deleteEntryType(ctx context.Context, w io.Writer, locationID string, entryTypeID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/entryTypes/%s", projectID, locationID, entryTypeID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.DeleteEntryTypeRequest{
		Name: name,
	}

	op, err := client.DeleteEntryType(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteEntryType: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted entry type: %s\n", name)
	return nil
}

// [END dataplex_v1_catalogservice_entrytype_delete]
