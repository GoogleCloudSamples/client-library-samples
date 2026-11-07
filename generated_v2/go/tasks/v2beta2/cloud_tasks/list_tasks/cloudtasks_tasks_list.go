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

// [START cloudtasks_v2beta2_cloudtasks_tasks_list]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta3"
	cloudtaskspb "cloud.google.com/go/cloudtasks/apiv2beta3/cloudtaskspb"
	"google.golang.org/api/iterator"
)

// listTasks lists tasks in a Cloud Tasks queue.
func listTasks(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID)

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudtaskspb.ListTasksRequest{
		Parent: parent,
	}

	it := client.ListTasks(ctx, req)
	for {
		task, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate tasks: %w", err)
		}
		fmt.Fprintf(w, "Task: %s\n", task.GetName())
	}

	return nil
}

// [END cloudtasks_v2beta2_cloudtasks_tasks_list]
