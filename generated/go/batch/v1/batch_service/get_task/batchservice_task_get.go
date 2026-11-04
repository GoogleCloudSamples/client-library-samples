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

// [START batch_v1_batchservice_task_get]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
)

// getTask retrieves details for a specific task within a Batch job.
func getTask(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string, taskGroupID string, taskID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s/taskGroups/%s/tasks/%s", projectID, locationID, jobID, taskGroupID, taskID)

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &batchpb.GetTaskRequest{
		Name: name,
	}

	resp, err := client.GetTask(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTask failed: %w", err)
	}

	fmt.Fprintf(w, "Task retrieved: %s\n", resp.GetName())
	fmt.Fprintf(w, "Task state: %s\n", resp.GetStatus().GetState())

	return nil
}

// [END batch_v1_batchservice_task_get]
