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

// [START cloudresourcemanager_v3_projects_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	iampb "cloud.google.com/go/iam/apiv1/iampb"
	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
)

// getIamPolicy retrieves the IAM policy for a specified Google Cloud project.
func getIamPolicy(ctx context.Context, w io.Writer, projectID string) error {
	resource := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudresourcemanager.NewProjectsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectsClient failed: %w", err)
	}
	defer client.Close()

	// Requesting policy version 3 prevents internal errors when policies contain conditions.
	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
		Options: &iampb.GetPolicyOptions{
			RequestedPolicyVersion: 3,
		},
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIamPolicy: %w", err)
	}

	fmt.Fprintf(w, "Retrieved IAM policy for %s\n", resource)
	for _, binding := range policy.GetBindings() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", binding.GetRole(), binding.GetMembers())
	}

	return nil
}

// [END cloudresourcemanager_v3_projects_iampolicy_get]
