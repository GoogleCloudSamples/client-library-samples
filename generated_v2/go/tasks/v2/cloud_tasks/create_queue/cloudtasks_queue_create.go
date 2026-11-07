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

// [START cloudtasks_v2_cloudtasks_queue_create]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2"
	taskspb "cloud.google.com/go/cloudtasks/apiv2/cloudtaskspb"
)

// createQueue creates a new queue in Cloud Tasks.
func createQueue(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	queue := &taskspb.Queue{
		Name: fmt.Sprintf("%s/queues/%s", parent, queueID),
	}

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &taskspb.CreateQueueRequest{
		Parent: parent,
		Queue:  queue,
	}

	createdQueue, err := client.CreateQueue(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateQueue: %w", err)
	}

	fmt.Fprintf(w, "Created queue: %s\n", createdQueue.GetName())
	return nil
}

// [END cloudtasks_v2_cloudtasks_queue_create]
