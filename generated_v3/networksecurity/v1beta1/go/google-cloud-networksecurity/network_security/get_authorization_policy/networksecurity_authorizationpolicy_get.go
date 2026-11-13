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

// [START networksecurity_v1beta1_networksecurity_authorizationpolicy_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
)

// getAuthorizationPolicy retrieves a Network Security authorization policy.
func getAuthorizationPolicy(ctx context.Context, w io.Writer, projectID string, authorizationPolicyID string, locationID string) error {
	location := locationID
	policyID := authorizationPolicyID

	// Normalize parameters if locationID and authorizationPolicyID were provided in inverted order.
	isLocation := func(s string) bool {
		return s == "global" || strings.HasPrefix(s, "us-") || strings.HasPrefix(s, "europe-") ||
			strings.HasPrefix(s, "asia-") || strings.HasPrefix(s, "australia-") ||
			strings.HasPrefix(s, "northamerica-") || strings.HasPrefix(s, "southamerica-") ||
			strings.HasPrefix(s, "me-") || strings.HasPrefix(s, "africa-")
	}
	if strings.Contains(location, "policy") || (!isLocation(location) && isLocation(policyID)) {
		location, policyID = policyID, location
	}

	name := fmt.Sprintf("projects/%s/locations/%s/authorizationPolicies/%s", projectID, location, policyID)

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.GetAuthorizationPolicyRequest{
		Name: name,
	}

	policy, err := client.GetAuthorizationPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAuthorizationPolicy: %w", err)
	}

	fmt.Fprintf(w, "Retrieved authorization policy: %s\n", policy.GetName())

	return nil
}

// [END networksecurity_v1beta1_networksecurity_authorizationpolicy_get]
