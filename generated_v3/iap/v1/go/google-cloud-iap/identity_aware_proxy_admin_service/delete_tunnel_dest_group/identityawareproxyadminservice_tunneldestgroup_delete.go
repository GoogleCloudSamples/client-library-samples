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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// deleteTunnelDestGroup deletes an existing TCP destination group in Identity-Aware Proxy.
func deleteTunnelDestGroup(ctx context.Context, w io.Writer, locationID string, projectID string, destGroupID string) error {
	name := fmt.Sprintf("projects/%s/iap_tunnel/locations/%s/destGroups/%s", projectID, locationID, destGroupID)

	client, err := iap.NewIdentityAwareProxyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.DeleteTunnelDestGroupRequest{
		Name: name,
	}

	if err := client.DeleteTunnelDestGroup(ctx, req); err != nil {
		return fmt.Errorf("DeleteTunnelDestGroup failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted destination group: %s\n", name)
	return nil
}

// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]
