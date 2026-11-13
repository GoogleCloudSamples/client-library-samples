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

// [START bigtableadmin_v2_bigtableinstanceadmin_logicalview_create]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// createLogicalView creates a logical view in an existing Bigtable instance.
func createLogicalView(ctx context.Context, w io.Writer, projectID string, instanceID string, logicalViewID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)
	logicalView := &adminpb.LogicalView{
		Query: "SELECT 1 AS col",
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateLogicalViewRequest{
		Parent:        parent,
		LogicalViewId: logicalViewID,
		LogicalView:   logicalView,
	}

	op, err := client.CreateLogicalView(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateLogicalView failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created logical view: %s\n", resp.GetName())

	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_logicalview_create]
