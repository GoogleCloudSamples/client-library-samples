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

// [START gkehub_v1beta1_gkehubmembershipservice_memberships_list]

import (
	"context"
	"fmt"
	"io"

	gkehub "cloud.google.com/go/gkehub/apiv1beta1"
	gkehubpb "cloud.google.com/go/gkehub/apiv1beta1/gkehubpb"
	"google.golang.org/api/iterator"
)

// listMemberships lists fleet memberships registered in the specified project.
func listMemberships(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)

	client, err := gkehub.NewGkeHubMembershipClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeHubMembershipClient failed: %w", err)
	}
	defer client.Close()

	req := &gkehubpb.ListMembershipsRequest{
		Parent: parent,
	}

	it := client.ListMemberships(ctx, req)
	for {
		membership, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve membership: %w", err)
		}
		fmt.Fprintf(w, "Membership: %s\n", membership.GetName())
	}

	return nil
}

// [END gkehub_v1beta1_gkehubmembershipservice_memberships_list]
