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

// [START networksecurity_v1_mirroring_mirroringdeploymentgroup_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createMirroringDeploymentGroup creates a new mirroring deployment group in a given project and location.
func createMirroringDeploymentGroup(ctx context.Context, w io.Writer, projectID string, locationID string, mirroringDeploymentGroupID string, networkID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	mirroringDeploymentGroup := &networksecuritypb.MirroringDeploymentGroup{
		Network: fmt.Sprintf("projects/%s/global/networks/%s", projectID, networkID),
	}

	client, err := networksecurity.NewMirroringClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMirroringClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateMirroringDeploymentGroupRequest{
		Parent:                     parent,
		MirroringDeploymentGroupId: mirroringDeploymentGroupID,
		MirroringDeploymentGroup:   mirroringDeploymentGroup,
	}

	op, err := client.CreateMirroringDeploymentGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateMirroringDeploymentGroup: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created mirroring deployment group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_mirroring_mirroringdeploymentgroup_create]
