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

// [START redis_v1_cloudredis_reschedule_maintenance]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1"
	redispb "cloud.google.com/go/redis/apiv1/redispb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// rescheduleMaintenance reschedules maintenance for a Cloud Redis instance.
func rescheduleMaintenance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)
	rescheduleType := redispb.RescheduleMaintenanceRequest_IMMEDIATE

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient: %w", err)
	}
	defer client.Close()

	req := &redispb.RescheduleMaintenanceRequest{
		Name:           name,
		RescheduleType: rescheduleType,
	}

	op, err := client.RescheduleMaintenance(ctx, req)
	if err != nil {
		// Instances without an upcoming maintenance event return FailedPrecondition.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Instance %s has no upcoming maintenance event to reschedule\n", name)
			return nil
		}
		return fmt.Errorf("RescheduleMaintenance: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Instance %s has no upcoming maintenance event to reschedule\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Rescheduled maintenance for instance: %s\n", resp.GetName())

	return nil
}

// [END redis_v1_cloudredis_reschedule_maintenance]
