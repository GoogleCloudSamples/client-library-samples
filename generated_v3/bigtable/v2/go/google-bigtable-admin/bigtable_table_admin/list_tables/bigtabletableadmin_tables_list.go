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

// [START bigtableadmin_v2_bigtabletableadmin_tables_list]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/api/iterator"
)

// listTables lists Cloud Bigtable tables within an instance.
func listTables(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListTablesRequest{
		Parent: parent,
	}

	it := client.ListTables(ctx, req)
	for {
		table, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "Table: %s\n", table.GetName())
	}

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_tables_list]
