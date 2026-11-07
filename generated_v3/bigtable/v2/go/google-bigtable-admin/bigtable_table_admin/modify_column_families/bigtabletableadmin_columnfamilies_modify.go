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

// [START bigtableadmin_v2_bigtabletableadmin_modify_column_families]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// modifyColumnFamilies modifies column families on an existing Cloud Bigtable table.
func modifyColumnFamilies(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string) error {
	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	rule := &adminpb.GcRule{
		Rule: &adminpb.GcRule_MaxNumVersions{
			MaxNumVersions: 1,
		},
	}
	newFamily := &adminpb.ColumnFamily{
		GcRule: rule,
	}
	modifications := []*adminpb.ModifyColumnFamiliesRequest_Modification{
		{
			Id: "cf1",
			Mod: &adminpb.ModifyColumnFamiliesRequest_Modification_Create{
				Create: newFamily,
			},
		},
	}

	req := &adminpb.ModifyColumnFamiliesRequest{
		Name:          name,
		Modifications: modifications,
	}

	table, err := client.ModifyColumnFamilies(ctx, req)
	if err != nil {
		return fmt.Errorf("ModifyColumnFamilies failed: %w", err)
	}

	fmt.Fprintf(w, "Modified column families for table: %s\n", table.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_modify_column_families]
