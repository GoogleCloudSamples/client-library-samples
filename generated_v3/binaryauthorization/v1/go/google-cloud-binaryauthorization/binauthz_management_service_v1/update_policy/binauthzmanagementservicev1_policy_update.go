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

// [START binaryauthorization_v1_binauthzmanagementservicev1_policy_update]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1"
	binaryauthorizationpb "cloud.google.com/go/binaryauthorization/apiv1/binaryauthorizationpb"
)

// updatePolicy updates the Binary Authorization policy for a project.
func updatePolicy(ctx context.Context, w io.Writer, projectID string) error {
	policy := &binaryauthorizationpb.Policy{
		Name:        fmt.Sprintf("projects/%s/policy", projectID),
		Description: "Updated policy description",
		DefaultAdmissionRule: &binaryauthorizationpb.AdmissionRule{
			EvaluationMode:  binaryauthorizationpb.AdmissionRule_ALWAYS_ALLOW,
			EnforcementMode: binaryauthorizationpb.AdmissionRule_ENFORCED_BLOCK_AND_AUDIT_LOG,
		},
	}

	client, err := binaryauthorization.NewBinauthzManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBinauthzManagementClient: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.UpdatePolicyRequest{
		Policy: policy,
	}

	resp, err := client.UpdatePolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePolicy: %w", err)
	}

	fmt.Fprintf(w, "Updated policy: %s\n", resp.GetName())
	return nil
}

// [END binaryauthorization_v1_binauthzmanagementservicev1_policy_update]
