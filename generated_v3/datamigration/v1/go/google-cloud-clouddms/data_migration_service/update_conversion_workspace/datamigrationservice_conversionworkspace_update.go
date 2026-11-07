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

// [START datamigration_v1_datamigrationservice_conversionworkspace_update]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	"cloud.google.com/go/clouddms/apiv1/clouddmspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateConversionWorkspace updates an existing conversion workspace.
func updateConversionWorkspace(ctx context.Context, w io.Writer, projectID string, locationID string, conversionWorkspaceID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}
	conversionWorkspace := &clouddmspb.ConversionWorkspace{
		Name:        fmt.Sprintf("projects/%s/locations/%s/conversionWorkspaces/%s", projectID, locationID, conversionWorkspaceID),
		DisplayName: "Updated Conversion Workspace",
	}

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.UpdateConversionWorkspaceRequest{
		UpdateMask:          updateMask,
		ConversionWorkspace: conversionWorkspace,
	}

	op, err := client.UpdateConversionWorkspace(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConversionWorkspace failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated conversion workspace: %s\n", resp.GetName())
	return nil
}

// [END datamigration_v1_datamigrationservice_conversionworkspace_update]
