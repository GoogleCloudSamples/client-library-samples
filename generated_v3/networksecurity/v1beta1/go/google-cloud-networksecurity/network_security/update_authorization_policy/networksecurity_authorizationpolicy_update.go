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

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAuthorizationPolicy updates an existing authorization policy.
func updateAuthorizationPolicy(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION")
	if location == "" {
		location = "global"
	}

	policyID := os.Getenv("AUTHORIZATION_POLICY_ID")
	if policyID == "" {
		policyID = os.Getenv("POLICY_ID")
	}
	if policyID == "" {
		policyID = "example-authorization-policy"
	}

	policyName := fmt.Sprintf("projects/%s/locations/%s/authorizationPolicies/%s", projectID, location, policyID)

	authorizationPolicy := &networksecuritypb.AuthorizationPolicy{
		Name:        policyName,
		Description: "Updated authorization policy",
		Action:      networksecuritypb.AuthorizationPolicy_ALLOW,
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateAuthorizationPolicyRequest{
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"description", "action"},
		},
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

// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_update]
