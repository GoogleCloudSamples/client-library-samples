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

// [START iam-admin_v1_iam_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/apiv1/iampb"
)

// getIamPolicy gets the IAM policy for the specified service account.
func getIamPolicy(ctx context.Context, w io.Writer, projectID, serviceAccountID string) error {
	resource := fmt.Sprintf("projects/%s/serviceAccounts/%s", projectID, serviceAccountID)

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved policy for %s\n", resource)
	for _, role := range policy.Roles() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", role, policy.Members(role))
	}

	return nil
}

// [END iam-admin_v1_iam_iampolicy_get]
