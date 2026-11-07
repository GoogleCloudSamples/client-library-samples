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

// [START vmmigration_v1_vmmigration_group_update]

import (
	"context"
	"fmt"
	"io"

	vmmigration "cloud.google.com/go/vmmigration/apiv1"
	vmmigrationpb "cloud.google.com/go/vmmigration/apiv1/vmmigrationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateGroup updates an existing migration group.
func updateGroup(ctx context.Context, w io.Writer, projectID string, locationID string, groupID string) error {
	group := &vmmigrationpb.Group{
		Name:        fmt.Sprintf("projects/%s/locations/%s/groups/%s", projectID, locationID, groupID),
		Description: "Updated group description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := vmmigration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &vmmigrationpb.UpdateGroupRequest{
		Group:      group,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateGroup: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated group: %s\n", resp.GetName())
	return nil
}

// [END vmmigration_v1_vmmigration_group_update]
