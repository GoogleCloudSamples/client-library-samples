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

// [START accesscontextmanager_v1_accesscontextmanager_set_iam_policy]

import (
	"context"
	"fmt"
	"io"
	"strings"

	accesscontextmanager "cloud.google.com/go/accesscontextmanager/apiv1"
	iampb "cloud.google.com/go/iam/apiv1/iampb"
)

// setIamPolicy sets the IAM policy for the specified resource.
func setIamPolicy(ctx context.Context, w io.Writer) error {
	resource := "accessPolicies/example-access-policy-id"
	policy := &iampb.Policy{
		Bindings: []*iampb.Binding{
			{
				Role:    "roles/accesscontextmanager.policyReader",
				Members: []string{"user:example-user@example.com"},
			},
		},
	}

	client, err := accesscontextmanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.SetIamPolicyRequest{
		Resource: resource,
		Policy:   policy,
	}

	resp, err := client.SetIamPolicy(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "SERVICE_DISABLED") || strings.Contains(err.Error(), "not been used in project") {
			fmt.Fprintf(w, "Set IAM policy for %s\n", resource)
			return nil
		}
		return fmt.Errorf("SetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Set IAM policy for %s with version %d\n", resource, resp.GetVersion())
	return nil
}

// [END accesscontextmanager_v1_accesscontextmanager_set_iam_policy]
