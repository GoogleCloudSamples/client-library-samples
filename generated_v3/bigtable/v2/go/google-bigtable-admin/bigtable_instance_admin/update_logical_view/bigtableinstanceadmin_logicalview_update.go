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

// [START bigtableadmin_v2_bigtableinstanceadmin_logicalview_update]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateLogicalView updates an existing Bigtable logical view.
func updateLogicalView(ctx context.Context, w io.Writer, projectID string, instanceID string, logicalViewID string) error {
	logicalView := &adminpb.LogicalView{
		Name:               fmt.Sprintf("projects/%s/instances/%s/logicalViews/%s", projectID, instanceID, logicalViewID),
		DeletionProtection: true,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"deletion_protection"},
	}

	client, err := admin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.UpdateLogicalViewRequest{
		LogicalView: logicalView,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateLogicalView(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateLogicalView: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated logical view: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_logicalview_update]
