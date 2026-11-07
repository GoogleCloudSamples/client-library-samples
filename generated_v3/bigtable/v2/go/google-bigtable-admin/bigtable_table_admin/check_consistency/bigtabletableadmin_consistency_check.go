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

// [START bigtableadmin_v2_bigtabletableadmin_check_consistency]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	bigtableadminpb "google.golang.org/genproto/googleapis/bigtable/admin/v2"
)

// checkConsistency checks whether mutations made to a table have replicated.
func checkConsistency(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string, consistencyToken string) error {
	name := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	req := &bigtableadminpb.CheckConsistencyRequest{
		Name:             name,
		ConsistencyToken: consistencyToken,
	}

	resp, err := client.CheckConsistency(ctx, req)
	if err != nil {
		return fmt.Errorf("CheckConsistency: %w", err)
	}

	fmt.Fprintf(w, "Table consistency status: %t\n", resp.GetConsistent())

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_check_consistency]
