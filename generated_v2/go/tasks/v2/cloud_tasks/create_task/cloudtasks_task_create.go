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

// [START cloudtasks_v2_cloudtasks_task_create]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2"
	cloudtaskspb "cloud.google.com/go/cloudtasks/apiv2/cloudtaskspb"
)

// createTask creates a task in a Cloud Tasks queue using the Cloud Tasks API.
func createTask(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string, responseID string, scheduleTimeID string, alreadyExistsID string, createTaskID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID)
	name := fmt.Sprintf("%s/tasks/%s", parent, createTaskID)
	task := &cloudtaskspb.Task{
		Name: name,
		MessageType: &cloudtaskspb.Task_HttpRequest{
			HttpRequest: &cloudtaskspb.HttpRequest{
				HttpMethod: cloudtaskspb.HttpMethod_POST,
				Url:        "https://example.com/task-handler",
			},
		},
	}

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudtaskspb.CreateTaskRequest{
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

// [END cloudtasks_v2_cloudtasks_task_create]
