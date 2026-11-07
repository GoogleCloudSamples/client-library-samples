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

// [START networksecurity_v1_mirroring_mirroringendpointgroup_get]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// getMirroringEndpointGroup retrieves the details of an existing MirroringEndpointGroup.
func getMirroringEndpointGroup(ctx context.Context, w io.Writer, projectID string, locationID string, mirroringEndpointGroupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/mirroringEndpointGroups/%s", projectID, locationID, mirroringEndpointGroupID)

	client, err := networksecurity.NewMirroringClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMirroringClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.GetMirroringEndpointGroupRequest{
		Name: name,
	}

	resp, err := client.GetMirroringEndpointGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMirroringEndpointGroup failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved MirroringEndpointGroup: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_mirroring_mirroringendpointgroup_get]
