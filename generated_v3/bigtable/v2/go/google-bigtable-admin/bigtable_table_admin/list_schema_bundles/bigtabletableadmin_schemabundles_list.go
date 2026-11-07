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

// [START bigtableadmin_v2_bigtabletableadmin_schemabundles_list]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/api/iterator"
)

// listSchemaBundles retrieves and prints schema bundles for a specified table.
func listSchemaBundles(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListSchemaBundlesRequest{
		Parent: parent,
	}

	it := client.ListSchemaBundles(ctx, req)
	var count int
	for {
		bundle, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListSchemaBundles iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Schema bundle: %s\n", bundle.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintf(w, "No schema bundles found for table %s\n", tableID)
	}

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_schemabundles_list]
