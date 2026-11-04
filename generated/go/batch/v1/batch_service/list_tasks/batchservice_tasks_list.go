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

package snippets

// [START batch_v1_batchservice_tasks_list]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
	"google.golang.org/api/iterator"
)

// listTasks lists tasks in the specified task group.
func listTasks(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string, taskGroupID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/jobs/%s/taskGroups/%s", projectID, locationID, jobID, taskGroupID)

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &batchpb.ListTasksRequest{
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

// [END batch_v1_batchservice_tasks_list]
