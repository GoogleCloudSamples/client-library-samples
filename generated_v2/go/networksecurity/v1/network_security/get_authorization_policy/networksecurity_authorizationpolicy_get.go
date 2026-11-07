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

// [START networksecurity_v1_networksecurity_authorizationpolicy_get]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// getAuthorizationPolicy retrieves details of an authorization policy.
func getAuthorizationPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, authorizationPolicyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/authorizationPolicies/%s", projectID, locationID, authorizationPolicyID)

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.GetAuthorizationPolicyRequest{
		Name: name,
	}

	resp, err := client.GetAuthorizationPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAuthorizationPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved authorization policy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_authorizationpolicy_get]
