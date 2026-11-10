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

// [START servicedirectory_v1_registrationservice_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	iampb "cloud.google.com/go/iam/apiv1/iampb"
	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
)

// getIamPolicy retrieves the IAM policy for a Service Directory namespace.
func getIamPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string) error {
	resource := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s", projectID, locationID, namespaceID)

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved IAM policy for %s\n", resource)
	for _, binding := range policy.GetBindings() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", binding.GetRole(), binding.GetMembers())
	}

	return nil
}

// [END servicedirectory_v1_registrationservice_iampolicy_get]
