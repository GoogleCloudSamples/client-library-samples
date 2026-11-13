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

// [START bigtableadmin_v2_bigtabletableadmin_table_update]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTable updates an existing table's configuration using the UpdateTable method.
func updateTable(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"deletion_protection"},
	}
	table := &adminpb.Table{
		Name:               fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID),
		DeletionProtection: true,
	}

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.UpdateTableRequest{
		Table:      table,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateTable(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTable failed: %w", err)
	}

	updatedTable, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated table: %s\n", updatedTable.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_table_update]
