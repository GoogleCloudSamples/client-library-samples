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

// [START networkconnectivity_v1_hubservice_group_update]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateGroup updates the description of an existing Network Connectivity Center group.
func updateGroup(ctx context.Context, w io.Writer, projectID string, hubID string, groupID string) error {
	group := &networkconnectivitypb.Group{
		Name:        fmt.Sprintf("projects/%s/locations/global/hubs/%s/groups/%s", projectID, hubID, groupID),
		Description: "Updated group description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.UpdateGroupRequest{
		Group:      group,
		UpdateMask: updateMask,
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

// [END networkconnectivity_v1_hubservice_group_update]
