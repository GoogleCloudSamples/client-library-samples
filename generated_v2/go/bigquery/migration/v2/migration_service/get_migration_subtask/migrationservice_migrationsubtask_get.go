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

// [START bigquerymigration_v2_migrationservice_migrationsubtask_get]

import (
	"context"
	"fmt"
	"io"

	bigquerymigration "cloud.google.com/go/bigquery/migration/apiv2"
	migrationpb "cloud.google.com/go/bigquery/migration/apiv2/migrationpb"
)

// getMigrationSubtask retrieves a specific migration subtask.
func getMigrationSubtask(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string, subtaskID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workflows/%s/subtasks/%s", projectID, locationID, workflowID, subtaskID)

	client, err := bigquerymigration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigquerymigration.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationpb.GetMigrationSubtaskRequest{
		Name: name,
	}

	resp, err := client.GetMigrationSubtask(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMigrationSubtask: %w", err)
	}

	fmt.Fprintf(w, "Retrieved migration subtask: %s (State: %s)\n", resp.GetName(), resp.GetState())

	return nil
}

// [END bigquerymigration_v2_migrationservice_migrationsubtask_get]
