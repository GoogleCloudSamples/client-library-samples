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

// [START orgpolicy_v2_orgpolicy_policies_list]

import (
	"context"
	"fmt"
	"io"

	orgpolicy "cloud.google.com/go/orgpolicy/apiv2"
	orgpolicypb "cloud.google.com/go/orgpolicy/apiv2/orgpolicypb"
	"google.golang.org/api/iterator"
)

// listPolicies lists all organization policies attached to the specified project.
func listPolicies(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := orgpolicy.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &orgpolicypb.ListPoliciesRequest{
		Parent: parent,
	}

	it := client.ListPolicies(ctx, req)
	count := 0
	for {
		policy, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListPolicies iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Policy name: %s\n", policy.GetName())
	}

	fmt.Fprintf(w, "Listed %d policies for %s\n", count, parent)
	return nil
}

// [END orgpolicy_v2_orgpolicy_policies_list]
