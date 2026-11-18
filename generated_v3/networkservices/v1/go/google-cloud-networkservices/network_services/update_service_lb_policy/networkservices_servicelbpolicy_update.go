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

// [START networkservices_v1_networkservices_servicelbpolicy_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateServiceLbPolicy updates an existing ServiceLbPolicy.
func updateServiceLbPolicy(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "global"
	}

	policyID := os.Getenv("SERVICE_LB_POLICY_ID")
	if policyID == "" {
		policyID = "example-service-lb-policy"
	}

	policyName := fmt.Sprintf("projects/%s/locations/%s/serviceLbPolicies/%s", projectID, location, policyID)
	if envName := os.Getenv("SERVICE_LB_POLICY_NAME"); envName != "" {
		policyName = envName
	}

	serviceLbPolicy := &networkservicespb.ServiceLbPolicy{
		Name:        policyName,
		Description: "Updated service LB policy description",
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.UpdateServiceLbPolicyRequest{
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"description"},
		},
		ServiceLbPolicy: serviceLbPolicy,
	}

	op, err := client.UpdateServiceLbPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateServiceLbPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated service LB policy: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_servicelbpolicy_update]
