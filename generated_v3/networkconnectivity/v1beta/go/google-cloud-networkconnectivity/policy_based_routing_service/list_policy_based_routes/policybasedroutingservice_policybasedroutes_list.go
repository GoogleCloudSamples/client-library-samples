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

// [START networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	"cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listPolicyBasedRoutes lists all policy-based routes in a given project.
func listPolicyBasedRoutes(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)

	client, err := networkconnectivity.NewPolicyBasedRoutingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyBasedRoutingClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListPolicyBasedRoutesRequest{
		Parent: parent,
	}

	it := client.ListPolicyBasedRoutes(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Policy-based route: %s\n", resp.GetName())
	}

	return nil
}

// [END networkconnectivity_v1beta_policybasedroutingservice_policybasedroutes_list]
