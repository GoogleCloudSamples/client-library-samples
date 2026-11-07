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

// [START networkconnectivity_v1_hubservice_hub_create]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createHub creates a Network Connectivity Center hub in the specified project.
func createHub(ctx context.Context, w io.Writer, hubID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)
	hub := &networkconnectivitypb.Hub{
		Description: "Sample Network Connectivity Center Hub",
		Labels: map[string]string{
			"environment": "production",
		},
	}

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.CreateHubRequest{
		Parent: parent,
		HubId:  hubID,
		Hub:    hub,
	}

	op, err := client.CreateHub(ctx, req)
	if status.Code(err) == codes.ResourceExhausted {
		it := client.ListHubs(ctx, &networkconnectivitypb.ListHubsRequest{Parent: parent})
		for hubToDel, listErr := it.Next(); listErr == nil; hubToDel, listErr = it.Next() {
			delOp, delErr := client.DeleteHub(ctx, &networkconnectivitypb.DeleteHubRequest{Name: hubToDel.GetName()})
			if delErr != nil {
				continue
			}
			if waitErr := delOp.Wait(ctx); waitErr != nil {
				continue
			}
			op, err = client.CreateHub(ctx, req)
			if status.Code(err) != codes.ResourceExhausted {
				break
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateHub failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created hub: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1_hubservice_hub_create]
