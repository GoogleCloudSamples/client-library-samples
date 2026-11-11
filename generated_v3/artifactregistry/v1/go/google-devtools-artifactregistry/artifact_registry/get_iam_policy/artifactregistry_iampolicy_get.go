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

// [START artifactregistry_v1_artifactregistry_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	iampb "cloud.google.com/go/iam/apiv1/iampb"
)

// getIamPolicy gets the IAM policy for the specified Artifact Registry repository.
func getIamPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	resource := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "IAM policy for %s:\n", resource)
	for _, binding := range policy.GetBindings() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", binding.GetRole(), binding.GetMembers())
	}

	return nil
}

// [END artifactregistry_v1_artifactregistry_iampolicy_get]
