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

// [START notebooks_v1_notebookservice_schedule_create]

import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1"
	notebookspb "cloud.google.com/go/notebooks/apiv1/notebookspb"
)

// createSchedule creates a notebook execution schedule in a project and location.
func createSchedule(ctx context.Context, w io.Writer, projectID string, locationID string, scheduleID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	executionTemplate := &notebookspb.ExecutionTemplate{
		ScaleTier:            notebookspb.ExecutionTemplate_BASIC,
		MasterType:           "n1-standard-4",
		JobType:              notebookspb.ExecutionTemplate_VERTEX_AI,
		InputNotebookFile:    "gs://example-bucket/input.ipynb",
		OutputNotebookFolder: "gs://example-bucket/output",
	}
	schedule := &notebookspb.Schedule{
		DisplayName:       "Example Schedule",
		Description:       "Recurring execution schedule",
		CronSchedule:      "0 0 * * *",
		TimeZone:          "America/Los_Angeles",
		ExecutionTemplate: executionTemplate,
	}

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient: %w", err)
	}
	defer client.Close()

	req := &notebookspb.CreateScheduleRequest{
		Parent:     parent,
		ScheduleId: scheduleID,
		Schedule:   schedule,
	}

	op, err := client.CreateSchedule(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSchedule: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created schedule: %s\n", resp.GetName())
	return nil
}

// [END notebooks_v1_notebookservice_schedule_create]
