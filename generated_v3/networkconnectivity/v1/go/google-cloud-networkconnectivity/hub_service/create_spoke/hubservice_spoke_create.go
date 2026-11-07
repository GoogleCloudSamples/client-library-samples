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

// [START networkconnectivity_v1_hubservice_spoke_create]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
)

// createSpoke creates a Network Connectivity Center spoke attached to a hub and linked to a VPC network.
func createSpoke(ctx context.Context, w io.Writer, spokeID string, projectID string, locationID string, hubID string, networkID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	spoke := &networkconnectivitypb.Spoke{
		Hub: fmt.Sprintf("projects/%s/locations/global/hubs/%s", projectID, hubID),
		LinkedVpcNetwork: &networkconnectivitypb.LinkedVpcNetwork{
			Uri: fmt.Sprintf("projects/%s/global/networks/%s", projectID, networkID),
		},
	}

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.CreateSpokeRequest{
		Parent:  parent,
		SpokeId: spokeID,
		Spoke:   spoke,
	}

	op, err := client.CreateSpoke(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSpoke failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created spoke: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1_hubservice_spoke_create]
