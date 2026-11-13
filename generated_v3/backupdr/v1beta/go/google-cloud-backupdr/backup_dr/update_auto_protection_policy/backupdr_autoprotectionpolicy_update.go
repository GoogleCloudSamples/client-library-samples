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

// [START backupdr_v1beta_backupdr_autoprotectionpolicy_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	"cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAutoProtectionPolicy updates an existing auto protection policy.
func updateAutoProtectionPolicy(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION")
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_REGION")
	}
	if location == "" {
		location = "example-location"
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	name := os.Getenv("AUTO_PROTECTION_POLICY_NAME")
	if name == "" {
		policyID := os.Getenv("POLICY_ID")
		if policyID == "" {
			policyID = os.Getenv("AUTO_PROTECTION_POLICY_ID")
		}
		if policyID != "" {
			name = fmt.Sprintf("projects/%s/locations/%s/autoProtectionPolicies/%s", projectID, location, policyID)
		}
	}

	// Retrieve an existing policy when an identifier is not explicitly provided in the environment.
	if name == "" {
		it := client.ListAutoProtectionPolicies(ctx, &backupdrpb.ListAutoProtectionPoliciesRequest{
			Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, location),
		})
		if policy, err := it.Next(); err == nil && policy != nil {
			name = policy.GetName()
		} else {
			name = fmt.Sprintf("projects/%s/locations/%s/autoProtectionPolicies/example-policy-id", projectID, location)
		}
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	autoProtectionPolicy := &backupdrpb.AutoProtectionPolicy{
		Name:        name,
		Description: "Updated description for auto protection policy",
	}

	req := &backupdrpb.UpdateAutoProtectionPolicyRequest{
		UpdateMask:           updateMask,
		AutoProtectionPolicy: autoProtectionPolicy,
	}

	op, err := client.UpdateAutoProtectionPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAutoProtectionPolicy: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated auto protection policy: %s\n", resp.GetName())

	return nil
}

// [END backupdr_v1beta_backupdr_autoprotectionpolicy_update]
