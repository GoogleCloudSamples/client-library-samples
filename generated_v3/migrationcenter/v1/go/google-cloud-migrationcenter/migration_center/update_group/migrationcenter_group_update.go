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

// [START migrationcenter_v1_migrationcenter_group_update]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateGroup method.
func updateGroup(ctx context.Context, w io.Writer, projectID string, locationID string, groupID string) error {
	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	group := &migrationcenterpb.Group{
		Name:        fmt.Sprintf("projects/%s/locations/%s/groups/%s", projectID, locationID, groupID),
		Description: "Updated group description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &migrationcenterpb.UpdateGroupRequest{
		UpdateMask: updateMask,
		Group:      group,
	}

	op, err := client.UpdateGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateGroup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated group: %s\n", resp.GetName())
	return nil
}

// [END migrationcenter_v1_migrationcenter_group_update]
