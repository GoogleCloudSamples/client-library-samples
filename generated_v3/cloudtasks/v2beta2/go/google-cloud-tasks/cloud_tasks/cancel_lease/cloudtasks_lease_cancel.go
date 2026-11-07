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

// [START cloudtasks_v2beta2_cloudtasks_lease_cancel]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta2"
	cloudtaskspb "cloud.google.com/go/cloudtasks/apiv2beta2/cloudtaskspb"
)

// cancelLease cancels the lease on a task in a pull queue.
func cancelLease(ctx context.Context, w io.Writer, taskID string, locationID string, projectID string, queueID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/queues/%s/tasks/%s", projectID, locationID, queueID, taskID)

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("cloudtasks.NewClient: %w", err)
	}
	defer client.Close()

	// CancelLease requires the task's current schedule time to ensure the caller holds the lease.
	task, err := client.GetTask(ctx, &cloudtaskspb.GetTaskRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("client.GetTask: %w", err)
	}

	scheduleTime := task.GetScheduleTime()

	req := &cloudtaskspb.CancelLeaseRequest{
		Name:         name,
		ScheduleTime: scheduleTime,
	}

	canceledTask, err := client.CancelLease(ctx, req)
	if err != nil {
		return fmt.Errorf("client.CancelLease: %w", err)
	}

	fmt.Fprintf(w, "Canceled lease for task: %s\n", canceledTask.GetName())
	return nil
}

// [END cloudtasks_v2beta2_cloudtasks_lease_cancel]
