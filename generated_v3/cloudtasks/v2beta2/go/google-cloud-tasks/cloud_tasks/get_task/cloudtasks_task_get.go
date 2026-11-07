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

// [START cloudtasks_v2beta2_cloudtasks_task_get]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta3"
	taskspb "cloud.google.com/go/cloudtasks/apiv2beta3/cloudtaskspb"
)

// getTask retrieves a task from the specified Cloud Tasks queue.
func getTask(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string, taskID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/queues/%s/tasks/%s", projectID, locationID, queueID, taskID)

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &taskspb.GetTaskRequest{
		Name: name,
	}

	task, err := client.GetTask(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTask: %w", err)
	}

	fmt.Fprintf(w, "Retrieved task: %s\n", task.GetName())
	return nil
}

// [END cloudtasks_v2beta2_cloudtasks_task_get]
