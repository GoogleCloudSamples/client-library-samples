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

// [START cloudresourcemanager_v3_tagvalues_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/iam/apiv1/iampb"
	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
)

// getIamPolicy gets the IAM access control policy for the specified TagValue resource.
func getIamPolicy(ctx context.Context, w io.Writer, tagValueID string) error {
	// Construct the TagValue resource name using the pattern 'tagValues/{tag_value_id}'.
	resource := fmt.Sprintf("tagValues/%s", tagValueID)

	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved IAM policy for %s\n", resource)
	for _, binding := range policy.GetBindings() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", binding.GetRole(), binding.GetMembers())
	}

	return nil
}

// [END cloudresourcemanager_v3_tagvalues_iampolicy_get]
