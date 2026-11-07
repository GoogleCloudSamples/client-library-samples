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

// [START bigtableadmin_v2_bigtabletableadmin_drop_row_range]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// dropRowRange drops rows from a table matching the specified row key prefix.
func dropRowRange(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string, rowKeyPrefix string) error {
	name := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.DropRowRangeRequest{
		Name: name,
		Target: &adminpb.DropRowRangeRequest_RowKeyPrefix{
			RowKeyPrefix: []byte(rowKeyPrefix),
		},
	}

	if err := client.DropRowRange(ctx, req); err != nil {
		return fmt.Errorf("DropRowRange: %w", err)
	}

	fmt.Fprintf(w, "Successfully dropped row range from table: %s\n", name)
	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_drop_row_range]
