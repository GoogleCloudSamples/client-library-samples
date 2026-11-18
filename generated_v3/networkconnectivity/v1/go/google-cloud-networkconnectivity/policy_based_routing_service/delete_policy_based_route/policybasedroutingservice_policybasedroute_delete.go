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

// [START networkconnectivity_v1_policybasedroutingservice_policybasedroute_delete]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
)

// deletePolicyBasedRoute deletes a policy-based route.
func deletePolicyBasedRoute(ctx context.Context, w io.Writer, projectID string, policyBasedRouteID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/policyBasedRoutes/%s", projectID, policyBasedRouteID)

	client, err := networkconnectivity.NewPolicyBasedRoutingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyBasedRoutingClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.DeletePolicyBasedRouteRequest{
		Name: name,
	}

	op, err := client.DeletePolicyBasedRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("DeletePolicyBasedRoute failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted policy-based route: %s\n", name)
	return nil
}

// [END networkconnectivity_v1_policybasedroutingservice_policybasedroute_delete]
