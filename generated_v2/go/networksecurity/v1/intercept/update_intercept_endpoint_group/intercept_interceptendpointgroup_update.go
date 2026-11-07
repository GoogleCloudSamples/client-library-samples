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

// [START networksecurity_v1_intercept_interceptendpointgroup_update]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateInterceptEndpointGroup updates the description of an existing InterceptEndpointGroup.
func updateInterceptEndpointGroup(ctx context.Context, w io.Writer, projectID string, locationID string, interceptEndpointGroupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/interceptEndpointGroups/%s", projectID, locationID, interceptEndpointGroupID)
	interceptEndpointGroup := &networksecuritypb.InterceptEndpointGroup{
		Name:        name,
		Description: "Updated intercept endpoint group description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networksecurity.NewInterceptClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInterceptClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateInterceptEndpointGroupRequest{
		UpdateMask:             updateMask,
		InterceptEndpointGroup: interceptEndpointGroup,
	}

	op, err := client.UpdateInterceptEndpointGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateInterceptEndpointGroup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated intercept endpoint group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_intercept_interceptendpointgroup_update]
