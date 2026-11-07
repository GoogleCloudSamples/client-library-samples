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

// [START networksecurity_v1_networksecurity_authorizationpolicy_update]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAuthorizationPolicy updates an existing authorization policy.
func updateAuthorizationPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, authorizationPolicyID string) error {
	authorizationPolicy := &networksecuritypb.AuthorizationPolicy{
		Name:        fmt.Sprintf("projects/%s/locations/%s/authorizationPolicies/%s", projectID, locationID, authorizationPolicyID),
		Description: "Updated description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateAuthorizationPolicyRequest{
		UpdateMask:          updateMask,
		AuthorizationPolicy: authorizationPolicy,
	}

	op, err := client.UpdateAuthorizationPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAuthorizationPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated authorization policy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_authorizationpolicy_update]
