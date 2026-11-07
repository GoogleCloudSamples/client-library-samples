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

// [START redis_v1_cloudredis_instance_delete]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1beta1"
	redispb "cloud.google.com/go/redis/apiv1beta1/redispb"
)

// deleteInstance deletes an existing Cloud Redis instance.
func deleteInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.DeleteInstanceRequest{
		Name: name,
	}

	op, err := client.DeleteInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteInstance failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("waiting for instance deletion failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted instance: %s\n", name)
	return nil
}

// [END redis_v1_cloudredis_instance_delete]
