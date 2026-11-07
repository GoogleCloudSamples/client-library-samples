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

// [START clouddeploy_v1_clouddeploy_target_delete]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// deleteTarget deletes an existing Cloud Deploy target.
func deleteTarget(ctx context.Context, w io.Writer, projectID string, locationID string, targetID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/targets/%s", projectID, locationID, targetID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient: %w", err)
	}
	defer client.Close()

	req := &deploypb.DeleteTargetRequest{
		Name: name,
	}

	op, err := client.DeleteTarget(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteTarget: %w", err)
	}

	// DeleteTarget is a long-running operation; wait for completion.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted target: %s\n", name)

	return nil
}

// [END clouddeploy_v1_clouddeploy_target_delete]
