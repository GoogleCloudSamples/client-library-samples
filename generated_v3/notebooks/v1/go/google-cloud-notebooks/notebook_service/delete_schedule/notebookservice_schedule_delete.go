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

// [START notebooks_v1_notebookservice_schedule_delete]

import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1"
	notebookspb "cloud.google.com/go/notebooks/apiv1/notebookspb"
)

// deleteSchedule deletes a schedule resource.
func deleteSchedule(ctx context.Context, w io.Writer, projectID string, locationID string, scheduleID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/schedules/%s", projectID, locationID, scheduleID)

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient: %w", err)
	}
	defer client.Close()

	req := &notebookspb.DeleteScheduleRequest{
		Name: name,
	}

	op, err := client.DeleteSchedule(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteSchedule: %w", err)
	}

	// Wait for the delete operation to finish.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Schedule deleted: %s\n", name)
	return nil
}

// [END notebooks_v1_notebookservice_schedule_delete]
