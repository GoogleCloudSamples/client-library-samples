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

// [START datamigration_v1_datamigrationservice_conversionworkspace_get]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	datamigrationpb "cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// getConversionWorkspace retrieves details for a specific conversion workspace.
func getConversionWorkspace(ctx context.Context, w io.Writer, projectID string, locationID string, conversionWorkspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/conversionWorkspaces/%s", projectID, locationID, conversionWorkspaceID)

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &datamigrationpb.GetConversionWorkspaceRequest{
		Name: name,
	}

	workspace, err := client.GetConversionWorkspace(ctx, req)
	if err != nil {
		return fmt.Errorf("GetConversionWorkspace failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved conversion workspace: %s\n", workspace.GetName())
	return nil
}

// [END datamigration_v1_datamigrationservice_conversionworkspace_get]
