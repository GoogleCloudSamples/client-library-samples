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

// [START networksecurity_v1_networksecurity_gatewaysecuritypolicyrule_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createGatewaySecurityPolicyRule creates a rule within a GatewaySecurityPolicy.
func createGatewaySecurityPolicyRule(ctx context.Context, w io.Writer, projectID string, locationID string, gatewaySecurityPolicyID string, gatewaySecurityPolicyRuleID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/gatewaySecurityPolicies/%s", projectID, locationID, gatewaySecurityPolicyID)
	gatewaySecurityPolicyRule := &networksecuritypb.GatewaySecurityPolicyRule{
		Enabled:        true,
		Priority:       1000,
		SessionMatcher: `host() == "example.com"`,
		Profile: &networksecuritypb.GatewaySecurityPolicyRule_BasicProfile_{
			BasicProfile: networksecuritypb.GatewaySecurityPolicyRule_ALLOW,
		},
		Description: "Rule allowing traffic to example.com",
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateGatewaySecurityPolicyRuleRequest{
		Parent:                      parent,
		GatewaySecurityPolicyRuleId: gatewaySecurityPolicyRuleID,
		GatewaySecurityPolicyRule:   gatewaySecurityPolicyRule,
	}

	op, err := client.CreateGatewaySecurityPolicyRule(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGatewaySecurityPolicyRule failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created GatewaySecurityPolicyRule: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_gatewaysecuritypolicyrule_create]
