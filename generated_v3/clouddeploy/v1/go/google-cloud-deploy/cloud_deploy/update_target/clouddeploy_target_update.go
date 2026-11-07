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

// [START clouddeploy_v1_clouddeploy_target_update]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTarget updates an existing Google Cloud Deploy target.
func updateTarget(ctx context.Context, w io.Writer, projectID string, locationID string, targetID string) error {
	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	target := &deploypb.Target{
		Name:        fmt.Sprintf("projects/%s/locations/%s/targets/%s", projectID, locationID, targetID),
		Description: "Updated target description",
	}

	req := &deploypb.UpdateTargetRequest{
		UpdateMask: updateMask,
		Target:     target,
	}

	op, err := client.UpdateTarget(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTarget failed: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for target update operation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated target: %s\n", response.GetName())
	return nil
}

// [END clouddeploy_v1_clouddeploy_target_update]
