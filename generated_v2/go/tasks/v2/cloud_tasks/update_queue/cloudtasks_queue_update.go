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

// [START cloudtasks_v2_cloudtasks_queue_update]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2"
	taskspb "cloud.google.com/go/cloudtasks/apiv2/cloudtaskspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateQueue updates the configuration of an existing Cloud Tasks queue.
func updateQueue(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	locationID := os.Getenv("CLOUD_TASKS_LOCATION")
	if locationID == "" {
		locationID = os.Getenv("LOCATION_ID")
	}
	if locationID == "" {
		locationID = os.Getenv("GOOGLE_CLOUD_LOCATION")
	}
	if locationID == "" {
		locationID = "us-central1"
	}

	queueID := os.Getenv("CLOUD_TASKS_QUEUE")
	if queueID == "" {
		queueID = os.Getenv("QUEUE_ID")
	}
	if queueID == "" {
		queueID = os.Getenv("CLOUD_TASKS_QUEUE_ID")
	}
	if queueID == "" {
		queueID = os.Getenv("QUEUE_NAME")
	}
	if queueID == "" {
		queueID = "example-queue-id"
	}

	queueName := fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID)
	if strings.HasPrefix(queueID, "projects/") {
		queueName = queueID
	}

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// Construct the queue configuration with updated rate limits.
	queue := &taskspb.Queue{
		Name: queueName,
		RateLimits: &taskspb.RateLimits{
			MaxDispatchesPerSecond: 20.0,
		},
	}

	// Specify the fields to update in the update mask.
	req := &taskspb.UpdateQueueRequest{
		Queue: queue,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"rate_limits.max_dispatches_per_second"},
		},
	}

	updatedQueue, err := client.UpdateQueue(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateQueue failed: %w", err)
	}

	fmt.Fprintf(w, "Updated queue: %s\n", updatedQueue.GetName())

	return nil
}

// [END cloudtasks_v2_cloudtasks_queue_update]
