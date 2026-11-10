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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_get]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// getTunnelDestGroup retrieves a tunnel destination group resource.
func getTunnelDestGroup(ctx context.Context, w io.Writer, locationID string, projectID string, destGroupID string) error {
	name := fmt.Sprintf("projects/%s/iap_tunnel/locations/%s/destGroups/%s", projectID, locationID, destGroupID)

	client, err := iap.NewIdentityAwareProxyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.GetTunnelDestGroupRequest{
		Name: name,
	}

	destGroup, err := client.GetTunnelDestGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTunnelDestGroup failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved tunnel destination group: %s\n", destGroup.GetName())

	return nil
}

// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_get]
