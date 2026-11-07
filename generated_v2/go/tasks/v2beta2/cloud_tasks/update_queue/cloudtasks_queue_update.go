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

// [START cloudtasks_v2beta2_cloudtasks_queue_update]

import (
	"context"
	"fmt"
	"io"

	cloudtasks "cloud.google.com/go/cloudtasks/apiv2beta2"
	taskspb "cloud.google.com/go/cloudtasks/apiv2beta2/cloudtaskspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateQueue updates the configuration of an existing Cloud Tasks queue.
func updateQueue(ctx context.Context, w io.Writer, projectID string, locationID string, queueID string) error {
	queue := &taskspb.Queue{
		Name: fmt.Sprintf("projects/%s/locations/%s/queues/%s", projectID, locationID, queueID),
		RetryConfig: &taskspb.RetryConfig{
			NumAttempts: &taskspb.RetryConfig_MaxAttempts{
				MaxAttempts: 5,
			},
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"retry_config.max_attempts"},
	}

	client, err := cloudtasks.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("cloudtasks.NewClient: %w", err)
	}
	defer client.Close()

	req := &taskspb.UpdateQueueRequest{
		Queue:      queue,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateQueue(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateQueue: %w", err)
	}

	fmt.Fprintf(w, "Updated queue: %s\n", resp.GetName())
	return nil
}

// [END cloudtasks_v2beta2_cloudtasks_queue_update]
