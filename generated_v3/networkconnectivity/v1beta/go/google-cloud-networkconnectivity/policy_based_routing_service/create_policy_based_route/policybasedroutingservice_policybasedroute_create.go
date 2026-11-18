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

// [START networkconnectivity_v1beta_policybasedroutingservice_policybasedroute_create]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
)

// createPolicyBasedRoute creates a policy-based route in a VPC network.
func createPolicyBasedRoute(ctx context.Context, w io.Writer, policyBasedRouteID string, projectID string, networkID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)
	policyBasedRoute := &networkconnectivitypb.PolicyBasedRoute{
		Network: fmt.Sprintf("projects/%s/global/networks/%s", projectID, networkID),
		Filter: &networkconnectivitypb.PolicyBasedRoute_Filter{
			ProtocolVersion: networkconnectivitypb.PolicyBasedRoute_Filter_IPV4,
		},
		NextHop: &networkconnectivitypb.PolicyBasedRoute_NextHopIlbIp{
			NextHopIlbIp: "10.0.0.100",
		},
	}

	client, err := networkconnectivity.NewPolicyBasedRoutingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyBasedRoutingClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.CreatePolicyBasedRouteRequest{
		Parent:             parent,
		PolicyBasedRouteId: policyBasedRouteID,
		PolicyBasedRoute:   policyBasedRoute,
	}

	op, err := client.CreatePolicyBasedRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePolicyBasedRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created policy-based route: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1beta_policybasedroutingservice_policybasedroute_create]
