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

// [START iam_v3beta_policybindings_targetpolicybindings_search]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/apiv3beta"
	iampb "cloud.google.com/go/iam/apiv3beta/iampb"
	"google.golang.org/api/iterator"
)

// searchTargetPolicyBindings searches IAM policy bindings associated with a target resource.
func searchTargetPolicyBindings(ctx context.Context, w io.Writer, projectID string, locationID string, projectNumber string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	target := fmt.Sprintf("//cloudresourcemanager.googleapis.com/projects/%s", projectNumber)

	client, err := iam.NewPolicyBindingsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyBindingsClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.SearchTargetPolicyBindingsRequest{
		Parent: parent,
		Target: target,
	}

	it := client.SearchTargetPolicyBindings(ctx, req)
	var count int
	for {
		binding, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate policy bindings: %w", err)
		}
		fmt.Fprintf(w, "Found policy binding: %s\n", binding.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No policy bindings found.")
	}

	return nil
}

// [END iam_v3beta_policybindings_targetpolicybindings_search]
