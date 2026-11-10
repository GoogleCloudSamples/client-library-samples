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

// [START dataplex_v1_catalogservice_entrytypes_list]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
)

// listEntryTypes retrieves entry types defined in a given project and location.
func listEntryTypes(ctx context.Context, w io.Writer, locationID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataplex.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.ListEntryTypesRequest{
		Parent: parent,
	}

	it := client.ListEntryTypes(ctx, req)
	for {
		entryType, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate entry types: %w", err)
		}
		fmt.Fprintf(w, "Entry type: %s\n", entryType.GetName())
	}

	return nil
}

// [END dataplex_v1_catalogservice_entrytypes_list]
