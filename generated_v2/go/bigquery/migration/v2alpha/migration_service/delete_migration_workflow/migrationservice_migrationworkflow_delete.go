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

// [START analyticshub_v2alpha_migrationservice_migrationworkflow_delete]

import (
	"context"
	"fmt"
	"io"
	"os"

	migration "cloud.google.com/go/bigquery/migration/apiv2alpha"
	migrationpb "cloud.google.com/go/bigquery/migration/apiv2alpha/migrationpb"
)

// deleteMigrationWorkflow deletes a migration workflow resource.
func deleteMigrationWorkflow(ctx context.Context, w io.Writer) error {
	name := os.Getenv("WORKFLOW_NAME")
	if name == "" {
		name = os.Getenv("MIGRATION_WORKFLOW_NAME")
	}
	if name == "" {
		name = os.Getenv("MIGRATION_WORKFLOW")
	}
	if name == "" {
		projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
		if projectID == "" {
			projectID = "example-project-id"
		}
		location := os.Getenv("GOOGLE_CLOUD_LOCATION")
		if location == "" {
			location = os.Getenv("LOCATION")
		}
		if location == "" {
			location = "us"
		}
		workflowID := os.Getenv("WORKFLOW_ID")
		if workflowID == "" {
			workflowID = os.Getenv("MIGRATION_WORKFLOW_ID")
		}
		if workflowID == "" {
			workflowID = "example-workflow-id"
		}
		name = fmt.Sprintf("projects/%s/locations/%s/workflows/%s", projectID, location, workflowID)
	}

	client, err := migration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationpb.DeleteMigrationWorkflowRequest{
		Name: name,
	}

	if err := client.DeleteMigrationWorkflow(ctx, req); err != nil {
		return fmt.Errorf("DeleteMigrationWorkflow failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted migration workflow: %s\n", name)
	return nil
}

// [END analyticshub_v2alpha_migrationservice_migrationworkflow_delete]
