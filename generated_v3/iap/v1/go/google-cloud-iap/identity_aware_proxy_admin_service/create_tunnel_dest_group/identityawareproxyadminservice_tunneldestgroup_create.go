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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_create]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// createTunnelDestGroup creates a new tunnel destination group in Identity-Aware Proxy.
func createTunnelDestGroup(ctx context.Context, w io.Writer, locationID string, projectID string, tunnelDestGroupID string) error {
	parent := fmt.Sprintf("projects/%s/iap_tunnel/locations/%s", projectID, locationID)
	tunnelDestGroup := &iappb.TunnelDestGroup{
		Cidrs: []string{"10.0.0.1/32"},
		Fqdns: []string{"backend.example.com"},
	}

	client, err := iap.NewIdentityAwareProxyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyAdminClient: %w", err)
	}
	defer client.Close()

	req := &iappb.CreateTunnelDestGroupRequest{
		Parent:            parent,
		TunnelDestGroup:   tunnelDestGroup,
		TunnelDestGroupId: tunnelDestGroupID,
	}

	resp, err := client.CreateTunnelDestGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTunnelDestGroup: %w", err)
	}

	fmt.Fprintf(w, "Created tunnel destination group: %s\n", resp.GetName())
	return nil
}

// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
