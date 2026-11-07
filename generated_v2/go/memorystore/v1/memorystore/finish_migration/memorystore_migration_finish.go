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

// [START memorystore_v1_memorystore_finish_migration]

import (
	"context"
	"fmt"
	"io"
	"strconv"

	memorystore "cloud.google.com/go/memorystore/apiv1beta"
	"cloud.google.com/go/memorystore/apiv1beta/memorystorepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// finishMigration completes the migration for a Memorystore instance.
func finishMigration(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string, force string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	forceBool := false
	if force != "" {
		var err error
		forceBool, err = strconv.ParseBool(force)
		if err != nil {
			return fmt.Errorf("strconv.ParseBool: %w", err)
		}
	}

	client, err := memorystore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("memorystore.NewClient: %w", err)
	}
	defer client.Close()

	req := &memorystorepb.FinishMigrationRequest{
		Name:  name,
		Force: forceBool,
	}

	op, err := client.FinishMigration(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Instance %s is not in MIGRATING state\n", name)
			return nil
		}
		return fmt.Errorf("FinishMigration: %w", err)
	}

	// FinishMigration is a long-running operation; wait for it to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Instance %s is not in MIGRATING state\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Completed migration for instance: %s\n", resp.GetName())

	return nil
}

// [END memorystore_v1_memorystore_finish_migration]
