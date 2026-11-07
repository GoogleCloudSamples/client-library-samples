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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroup_update]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	"cloud.google.com/go/iap/apiv1/iappb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTunnelDestGroup updates an existing tunnel destination group's CIDRs.
func updateTunnelDestGroup(ctx context.Context, w io.Writer, projectID string, locationID string, destGroupID string) error {
	client, err := iap.NewIdentityAwareProxyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyAdminClient failed: %w", err)
	}
	defer client.Close()

	destGroupName := fmt.Sprintf("projects/%s/iap_tunnel/locations/%s/destGroups/%s", projectID, locationID, destGroupID)
	tunnelDestGroup := &iappb.TunnelDestGroup{
		Name:  destGroupName,
		Cidrs: []string{"10.0.0.1/32"},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"cidrs"},
	}

	req := &iappb.UpdateTunnelDestGroupRequest{
		TunnelDestGroup: tunnelDestGroup,
		UpdateMask:      updateMask,
	}

	resp, err := client.UpdateTunnelDestGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTunnelDestGroup: %w", err)
	}

	fmt.Fprintf(w, "Updated tunnel destination group: %s\n", resp.GetName())
	return nil
}

// [END iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
