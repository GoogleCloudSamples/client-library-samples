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

// [START cloudtasks_v2beta2_cloudtasks_pause_queue]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta2"
	taskspb "cloud.google.com/go/cloudtasks/apiv2beta2/cloudtaskspb"
)

// pauseQueue pauses a Cloud Tasks queue.
func pauseQueue(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID)

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("cloudtasks.NewClient: %w", err)
	}
	defer client.Close()

	req := &taskspb.PauseQueueRequest{
		Name: name,
	}

	queue, err := client.PauseQueue(ctx, req)
	if err != nil {
		return fmt.Errorf("PauseQueue: %w", err)
	}

	fmt.Fprintf(w, "Paused queue: %s\n", queue.GetName())
	return nil
}

// [END cloudtasks_v2beta2_cloudtasks_pause_queue]
