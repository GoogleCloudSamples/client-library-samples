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

// [START networkservices_v1_networkservices_servicelbpolicy_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createServiceLbPolicy creates a service load balancing policy.
func createServiceLbPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, serviceLbPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	serviceLbPolicyName := fmt.Sprintf("%s/serviceLbPolicies/%s", parent, serviceLbPolicyID)
	serviceLbPolicy := &networkservicespb.ServiceLbPolicy{
		Name:                   serviceLbPolicyName,
		LoadBalancingAlgorithm: networkservicespb.ServiceLbPolicy_SPRAY_TO_REGION,
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateServiceLbPolicyRequest{
		Parent:            parent,
		ServiceLbPolicyId: serviceLbPolicyID,
		ServiceLbPolicy:   serviceLbPolicy,
	}

	op, err := client.CreateServiceLbPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServiceLbPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Service LB Policy: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_servicelbpolicy_create]
