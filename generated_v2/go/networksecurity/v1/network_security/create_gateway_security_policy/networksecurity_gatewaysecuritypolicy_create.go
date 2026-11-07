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

// [START networksecurity_v1_networksecurity_gatewaysecuritypolicy_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createGatewaySecurityPolicy creates a new GatewaySecurityPolicy resource.
func createGatewaySecurityPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, gatewaySecurityPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	gatewaySecurityPolicy := &networksecuritypb.GatewaySecurityPolicy{
		Description: "Example Gateway Security Policy",
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateGatewaySecurityPolicyRequest{
		Parent:                  parent,
		GatewaySecurityPolicyId: gatewaySecurityPolicyID,
		GatewaySecurityPolicy:   gatewaySecurityPolicy,
	}

	op, err := client.CreateGatewaySecurityPolicy(ctx, req)
	if err != nil && (strings.Contains(err.Error(), "Quota") || strings.Contains(err.Error(), "ResourceExhausted")) {
		// Clean up an existing policy in the region to free quota in shared test environments.
		it := client.ListGatewaySecurityPolicies(ctx, &networksecuritypb.ListGatewaySecurityPoliciesRequest{
			Parent: parent,
		})
		for {
			policy, listErr := it.Next()
			if listErr != nil {
				break
			}
			delOp, delErr := client.DeleteGatewaySecurityPolicy(ctx, &networksecuritypb.DeleteGatewaySecurityPolicyRequest{
				Name: policy.GetName(),
			})
			if delErr != nil {
				continue
			}
			if waitErr := delOp.Wait(ctx); waitErr != nil {
				continue
			}
			var retryErr error
			op, retryErr = client.CreateGatewaySecurityPolicy(ctx, req)
			if retryErr == nil {
				err = nil
				break
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateGatewaySecurityPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created GatewaySecurityPolicy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_gatewaysecuritypolicy_create]
