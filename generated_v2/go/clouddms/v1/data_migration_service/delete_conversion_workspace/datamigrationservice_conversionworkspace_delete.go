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

// [START datamigration_v1_datamigrationservice_conversionworkspace_delete]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	"cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// deleteConversionWorkspace deletes an existing conversion workspace.
func deleteConversionWorkspace(ctx context.Context, w io.Writer, projectID string, locationID string, conversionWorkspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/conversionWorkspaces/%s", projectID, locationID, conversionWorkspaceID)

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.DeleteConversionWorkspaceRequest{
		Name: name,
	}

	op, err := client.DeleteConversionWorkspace(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteConversionWorkspace failed: %w", err)
	}

	// DeleteConversionWorkspace is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted conversion workspace: %s\n", name)
	return nil
}

// [END datamigration_v1_datamigrationservice_conversionworkspace_delete]
