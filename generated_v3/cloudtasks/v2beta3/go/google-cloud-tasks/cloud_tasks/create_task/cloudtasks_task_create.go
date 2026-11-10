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

// [START cloudtasks_v2beta3_cloudtasks_task_create]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta3"
	taskspb "cloud.google.com/go/cloudtasks/apiv2beta3/cloudtaskspb"
)

// createTask creates a task in the specified Cloud Tasks queue.
func createTask(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID)
	task := &taskspb.Task{
		PayloadType: &taskspb.Task_HttpRequest{
			HttpRequest: &taskspb.HttpRequest{
				HttpMethod: taskspb.HttpMethod_POST,
				Url:        "https://example.com/taskhandler",
				Body:       []byte("Sample payload"),
			},
		},
	}

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &taskspb.CreateTaskRequest{
		Parent: parent,
		Task:   task,
	}

	createdTask, err := client.CreateTask(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTask failed: %w", err)
	}

	fmt.Fprintf(w, "Created task: %s\n", createdTask.GetName())
	return nil
}

// [END cloudtasks_v2beta3_cloudtasks_task_create]
