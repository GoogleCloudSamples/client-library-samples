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

// [START datacatalog_v1beta1_datacatalog_lookup_entry]

import (
	"context"
	"fmt"
	"io"

	datacatalog "cloud.google.com/go/datacatalog/apiv1beta1"
	datacatalogpb "cloud.google.com/go/datacatalog/apiv1beta1/datacatalogpb"
)

// lookupEntry locates a Data Catalog entry by its linked resource identifier.
func lookupEntry(ctx context.Context, w io.Writer) error {
	projectID := "bigquery-public-data"
	datasetID := "usa_names"
	tableID := "usa_1910_2013"

	client, err := datacatalog.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	linkedResource := fmt.Sprintf("//bigquery.googleapis.com/projects/%s/datasets/%s/tables/%s", projectID, datasetID, tableID)

	req := &datacatalogpb.LookupEntryRequest{
		TargetName: &datacatalogpb.LookupEntryRequest_LinkedResource{
			LinkedResource: linkedResource,
		},
	}

	entry, err := client.LookupEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("LookupEntry failed: %w", err)
	}

	fmt.Fprintf(w, "Entry name: %s\n", entry.GetName())
	fmt.Fprintf(w, "Entry type: %s\n", entry.GetType())
	fmt.Fprintf(w, "Linked resource: %s\n", entry.GetLinkedResource())

	return nil
}

// [END datacatalog_v1beta1_datacatalog_lookup_entry]
