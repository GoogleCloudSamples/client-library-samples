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

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
)

// createAuthorizationPolicy creates an authorization policy in the specified location.
func createAuthorizationPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, authorizationPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	source := &networksecuritypb.AuthorizationPolicy_Rule_Source{
		Principals: []string{"*"},
	}
	rule := &networksecuritypb.AuthorizationPolicy_Rule{
		Sources: []*networksecuritypb.AuthorizationPolicy_Rule_Source{source},
	}
	authorizationPolicy := &networksecuritypb.AuthorizationPolicy{
		Action:      networksecuritypb.AuthorizationPolicy_ALLOW,
		Description: "Example authorization policy",
		Rules:       []*networksecuritypb.AuthorizationPolicy_Rule{rule},
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateAuthorizationPolicyRequest{
		Parent:                parent,
		AuthorizationPolicyId: authorizationPolicyID,
		AuthorizationPolicy:   authorizationPolicy,
	}

	op, err := client.CreateAuthorizationPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAuthorizationPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created authorization policy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_create]
