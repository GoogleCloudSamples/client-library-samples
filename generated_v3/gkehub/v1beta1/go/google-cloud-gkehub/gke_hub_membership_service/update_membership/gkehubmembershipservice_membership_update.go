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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_update]

import (
	"context"
	"fmt"
	"io"

	gkehub "cloud.google.com/go/gkehub/apiv1beta1"
	gkehubpb "cloud.google.com/go/gkehub/apiv1beta1/gkehubpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateMembership updates an existing fleet membership.
func updateMembership(ctx context.Context, w io.Writer, projectID string, membershipID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/memberships/%s", projectID, membershipID)
	resource := &gkehubpb.Membership{
		Labels: map[string]string{
			"env": "production",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	client, err := gkehub.NewGkeHubMembershipClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeHubMembershipClient: %w", err)
	}
	defer client.Close()

	req := &gkehubpb.UpdateMembershipRequest{
		Name:       name,
		UpdateMask: updateMask,
		Resource:   resource,
	}

	op, err := client.UpdateMembership(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateMembership: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated membership: %s\n", resp.GetName())

	return nil
}

// [END gkehub_v1beta1_gkehubmembershipservice_membership_update]
