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

// [START datamigration_v1_datamigrationservice_conversionworkspace_create]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	"cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// createConversionWorkspace creates a new conversion workspace using Data Migration Service.
func createConversionWorkspace(ctx context.Context, w io.Writer, conversionWorkspaceID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	conversionWorkspace := &clouddmspb.ConversionWorkspace{
		DisplayName: "Example Conversion Workspace",
		Source: &clouddmspb.DatabaseEngineInfo{
			Engine:  clouddmspb.DatabaseEngine_ORACLE,
			Version: "12.c.1",
		},
		Destination: &clouddmspb.DatabaseEngineInfo{
			Engine:  clouddmspb.DatabaseEngine_POSTGRESQL,
			Version: "13",
		},
	}

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.CreateConversionWorkspaceRequest{
		Parent:                parent,
		ConversionWorkspaceId: conversionWorkspaceID,
		ConversionWorkspace:   conversionWorkspace,
	}

	op, err := client.CreateConversionWorkspace(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateConversionWorkspace: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created conversion workspace: %s\n", resp.GetName())
	return nil
}

// [END datamigration_v1_datamigrationservice_conversionworkspace_create]
