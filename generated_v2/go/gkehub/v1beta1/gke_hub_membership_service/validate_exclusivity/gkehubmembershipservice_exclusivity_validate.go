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

// [START gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]

import (
	"context"
	"fmt"
	"io"

	gkehub "cloud.google.com/go/gkehub/apiv1beta1"
	gkehubpb "cloud.google.com/go/gkehub/apiv1beta1/gkehubpb"
)

// validateExclusivity validates cluster exclusivity before registering a membership.
func validateExclusivity(ctx context.Context, w io.Writer, projectID string, locationID string, intendedMembership string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := gkehub.NewGkeHubMembershipClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeHubMembershipClient failed: %w", err)
	}
	defer client.Close()

	req := &gkehubpb.ValidateExclusivityRequest{
		Parent:             parent,
		IntendedMembership: intendedMembership,
	}

	resp, err := client.ValidateExclusivity(ctx, req)
	if err != nil {
		return fmt.Errorf("ValidateExclusivity failed: %w", err)
	}

	fmt.Fprintf(w, "Validation status code: %d\n", resp.GetStatus().GetCode())
	return nil
}

// [END gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
