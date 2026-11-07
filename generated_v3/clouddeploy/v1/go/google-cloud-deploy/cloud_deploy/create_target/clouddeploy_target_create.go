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

// [START clouddeploy_v1_clouddeploy_target_create]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// createTarget creates a Target resource in Google Cloud Deploy.
func createTarget(ctx context.Context, w io.Writer, projectID string, targetID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	target := &deploypb.Target{
		Description: "Sample Cloud Deploy target",
		DeploymentTarget: &deploypb.Target_Run{
			Run: &deploypb.CloudRunLocation{
				Location: fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
			},
		},
	}

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient: %w", err)
	}
	defer client.Close()

	req := &deploypb.CreateTargetRequest{
		Parent:   parent,
		TargetId: targetID,
		Target:   target,
	}

	op, err := client.CreateTarget(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTarget: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("CreateTarget.Wait: %w", err)
	}

	fmt.Fprintf(w, "Created target: %s\n", resp.GetName())
	return nil
}

// [END clouddeploy_v1_clouddeploy_target_create]
