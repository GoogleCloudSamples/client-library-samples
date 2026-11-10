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

// [START iam_v3_accesspolicies_accesspolicies_list]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/apiv3"
	iampb "cloud.google.com/go/iam/apiv3/iampb"
	"google.golang.org/api/iterator"
)

// listAccessPolicies lists access policies in the specified project and location.
func listAccessPolicies(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := iam.NewAccessPoliciesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAccessPoliciesClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.ListAccessPoliciesRequest{
		Parent: parent,
	}

	it := client.ListAccessPolicies(ctx, req)
	count := 0
	for {
		policy, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListAccessPolicies: %w", err)
		}
		fmt.Fprintf(w, "Access policy: %s\n", policy.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No access policies found.")
	}

	return nil
}

// [END iam_v3_accesspolicies_accesspolicies_list]
