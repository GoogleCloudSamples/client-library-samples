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

// [START networksecurity_v1_mirroring_mirroringdeploymentgroup_update]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateMirroringDeploymentGroup updates the description of a mirroring deployment group.
func updateMirroringDeploymentGroup(ctx context.Context, w io.Writer, projectID string, locationID string, mirroringDeploymentGroupID string) error {
	mirroringDeploymentGroup := &networksecuritypb.MirroringDeploymentGroup{
		Name:        fmt.Sprintf("projects/%s/locations/%s/mirroringDeploymentGroups/%s", projectID, locationID, mirroringDeploymentGroupID),
		Description: "Updated description of the mirroring deployment group",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networksecurity.NewMirroringClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMirroringClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateMirroringDeploymentGroupRequest{
		UpdateMask:               updateMask,
		MirroringDeploymentGroup: mirroringDeploymentGroup,
	}

	op, err := client.UpdateMirroringDeploymentGroup(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			// Create the mirroring deployment group if it does not exist, then retry the update.
			createReq := &networksecuritypb.CreateMirroringDeploymentGroupRequest{
				Parent:                     fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
				MirroringDeploymentGroupId: mirroringDeploymentGroupID,
				MirroringDeploymentGroup: &networksecuritypb.MirroringDeploymentGroup{
					Network: fmt.Sprintf("projects/%s/global/networks/default", projectID),
				},
			}
			createOp, createErr := client.CreateMirroringDeploymentGroup(ctx, createReq)
			if createErr != nil {
				return fmt.Errorf("CreateMirroringDeploymentGroup failed: %w", createErr)
			}
			if _, waitErr := createOp.Wait(ctx); waitErr != nil {
				return fmt.Errorf("Wait for creation failed: %w", waitErr)
			}

			op, err = client.UpdateMirroringDeploymentGroup(ctx, req)
			if err != nil {
				return fmt.Errorf("UpdateMirroringDeploymentGroup failed: %w", err)
			}
		} else {
			return fmt.Errorf("UpdateMirroringDeploymentGroup failed: %w", err)
		}
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated mirroring deployment group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_mirroring_mirroringdeploymentgroup_update]
