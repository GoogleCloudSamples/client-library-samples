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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_create]

import (
	"context"
	"fmt"
	"io"

	gkehub "cloud.google.com/go/gkehub/apiv1beta1"
	gkehubpb "cloud.google.com/go/gkehub/apiv1beta1/gkehubpb"
)

// createMembership creates a new GKE Hub membership.
func createMembership(ctx context.Context, w io.Writer, projectID string, locationID string, membershipID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	resource := &gkehubpb.Membership{
		Description: "Example GKE Hub membership",
	}

	client, err := gkehub.NewGkeHubMembershipClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeHubMembershipClient failed: %w", err)
	}
	defer client.Close()

	req := &gkehubpb.CreateMembershipRequest{
		Parent:       parent,
		MembershipId: membershipID,
		Resource:     resource,
	}

	op, err := client.CreateMembership(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateMembership failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created membership: %s\n", resp.GetName())
	return nil
}

// [END gkehub_v1beta1_gkehubmembershipservice_membership_create]
