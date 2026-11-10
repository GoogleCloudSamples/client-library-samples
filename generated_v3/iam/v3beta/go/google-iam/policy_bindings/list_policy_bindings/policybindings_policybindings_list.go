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

// [START iam_v3beta_policybindings_policybindings_list]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/apiv3beta"
	iampb "cloud.google.com/go/iam/apiv3beta/iampb"
	"google.golang.org/api/iterator"
)

// listPolicyBindings lists policy bindings in a specified project and location.
func listPolicyBindings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := iam.NewPolicyBindingsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewPolicyBindingsClient: %w", err)
	}
	defer client.Close()

	req := &iampb.ListPolicyBindingsRequest{
		Parent: parent,
	}

	it := client.ListPolicyBindings(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListPolicyBindings iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Policy binding: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No policy bindings found.")
	}

	return nil
}

// [END iam_v3beta_policybindings_policybindings_list]
