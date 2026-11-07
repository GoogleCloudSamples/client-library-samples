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

// [START iap_v1_identityawareproxyadminservice_tunneldestgroups_list]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	"cloud.google.com/go/iap/apiv1/iappb"
	"google.golang.org/api/iterator"
)

// listTunnelDestGroups lists Cloud Identity-Aware Proxy tunnel destination groups in a given project and location.
func listTunnelDestGroups(ctx context.Context, w io.Writer, locationID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/iap_tunnel/locations/%s", projectID, locationID)

	client, err := iap.NewIdentityAwareProxyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.ListTunnelDestGroupsRequest{
		Parent: parent,
	}

	it := client.ListTunnelDestGroups(ctx, req)
	for {
		destGroup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTunnelDestGroups failed: %w", err)
		}
		fmt.Fprintf(w, "Destination Group: %s\n", destGroup.GetName())
	}

	return nil
}

// [END iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
