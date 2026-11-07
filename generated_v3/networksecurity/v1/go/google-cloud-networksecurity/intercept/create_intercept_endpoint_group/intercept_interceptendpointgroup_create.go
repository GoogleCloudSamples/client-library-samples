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

// [START networksecurity_v1_intercept_interceptendpointgroup_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createInterceptEndpointGroup creates an intercept endpoint group linked to a deployment group.
func createInterceptEndpointGroup(ctx context.Context, w io.Writer, projectID string, locationID string, interceptEndpointGroupID string, interceptDeploymentGroupID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	interceptDeploymentGroup := fmt.Sprintf("projects/%s/locations/%s/interceptDeploymentGroups/%s", projectID, locationID, interceptDeploymentGroupID)

	interceptEndpointGroup := &networksecuritypb.InterceptEndpointGroup{
		InterceptDeploymentGroup: interceptDeploymentGroup,
	}

	client, err := networksecurity.NewInterceptClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInterceptClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateInterceptEndpointGroupRequest{
		Parent:                   parent,
		InterceptEndpointGroupId: interceptEndpointGroupID,
		InterceptEndpointGroup:   interceptEndpointGroup,
	}

	// CreateInterceptEndpointGroup initiates a long-running operation.
	op, err := client.CreateInterceptEndpointGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateInterceptEndpointGroup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Intercept Endpoint Group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_intercept_interceptendpointgroup_create]
