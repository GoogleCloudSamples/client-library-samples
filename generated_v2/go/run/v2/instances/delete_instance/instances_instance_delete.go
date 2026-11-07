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

// [START run_v2_instances_instance_delete]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// Use the DeleteInstance method.
func deleteInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	client, err := run.NewInstancesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInstancesClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.DeleteInstanceRequest{
		Name: name,
	}

	op, err := client.DeleteInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteInstance failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for instance deletion failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted instance: %s\n", resp.GetName())
	return nil
}

// [END run_v2_instances_instance_delete]
