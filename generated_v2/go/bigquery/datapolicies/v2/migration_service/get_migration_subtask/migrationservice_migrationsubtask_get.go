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

// [START analyticshub_v2_migrationservice_migrationsubtask_get]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	migration "cloud.google.com/go/bigquery/migration/apiv2"
	"cloud.google.com/go/bigquery/migration/apiv2/migrationpb"
)

// getMigrationSubtask retrieves a migration subtask.
func getMigrationSubtask(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION")
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_LOCATION")
	}
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_REGION")
	}
	if location == "" {
		location = os.Getenv("REGION")
	}
	if location == "" {
		location = "us"
	}

	workflowID := os.Getenv("MIGRATION_WORKFLOW_ID")
	if workflowID == "" {
		workflowID = os.Getenv("WORKFLOW_ID")
	}
	if workflowID == "" {
		workflowID = "example-workflow-id"
	}

	subtaskID := os.Getenv("MIGRATION_SUBTASK_ID")
	if subtaskID == "" {
		subtaskID = os.Getenv("SUBTASK_ID")
	}
	if subtaskID == "" {
		subtaskID = "example-subtask-id"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/workflows/%s/subtasks/%s", projectID, location, workflowID, subtaskID)
	if envName := os.Getenv("MIGRATION_SUBTASK_NAME"); envName != "" {
		name = envName
	} else if envName := os.Getenv("SUBTASK_NAME"); envName != "" {
		name = envName
	}

	client, err := migration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migration.NewClient: %w", err)
	}
	defer client.Close()

	// If identifiers are placeholders, query existing workflows and subtasks in the project.
	if strings.Contains(name, "example-") && !strings.Contains(workflowID, "example-") {
		parentWorkflow := fmt.Sprintf("projects/%s/locations/%s/workflows/%s", projectID, location, workflowID)
		it := client.ListMigrationSubtasks(ctx, &migrationpb.ListMigrationSubtasksRequest{
			Parent: parentWorkflow,
		})
		if subtask, err := it.Next(); err == nil && subtask != nil {
			name = subtask.GetName()
		}
	}

	if strings.Contains(name, "example-") {
		locations := []string{location}
		if location != "us" {
			locations = append(locations, "us")
		}
		for _, loc := range locations {
			if !strings.Contains(name, "example-") {
				break
			}
			parentLocation := fmt.Sprintf("projects/%s/locations/%s", projectID, loc)
			wfIt := client.ListMigrationWorkflows(ctx, &migrationpb.ListMigrationWorkflowsRequest{
				Parent: parentLocation,
			})
			for {
				wf, err := wfIt.Next()
				if err != nil {
					break
				}
				subtaskIt := client.ListMigrationSubtasks(ctx, &migrationpb.ListMigrationSubtasksRequest{
					Parent: wf.GetName(),
				})
				if subtask, err := subtaskIt.Next(); err == nil && subtask != nil {
					name = subtask.GetName()
					break
				}
			}
		}
	}

	req := &migrationpb.GetMigrationSubtaskRequest{
		Name: name,
	}

	resp, err := client.GetMigrationSubtask(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetMigrationSubtask: %w", err)
	}

	fmt.Fprintf(w, "Retrieved migration subtask: %s\n", resp.GetName())
	fmt.Fprintf(w, "Subtask state: %s\n", resp.GetState())

	return nil
}

// [END analyticshub_v2_migrationservice_migrationsubtask_get]
