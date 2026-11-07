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

// [START redis_v1_cloudredis_instance_update]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1beta1"
	redispb "cloud.google.com/go/redis/apiv1beta1/redispb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateInstance updates the display name of an existing Cloud Redis instance.
func updateInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	instance := &redispb.Instance{
		Name:        fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID),
		DisplayName: "Updated Redis Instance",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.UpdateInstanceRequest{
		UpdateMask: updateMask,
		Instance:   instance,
	}

	op, err := client.UpdateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateInstance failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated instance: %s\n", resp.GetName())
	return nil
}

// [END redis_v1_cloudredis_instance_update]
