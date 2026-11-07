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

// [START orgpolicy_v2_orgpolicy_constraints_list]

import (
	"context"
	"fmt"
	"io"

	orgpolicy "cloud.google.com/go/orgpolicy/apiv2"
	orgpolicypb "cloud.google.com/go/orgpolicy/apiv2/orgpolicypb"
	"google.golang.org/api/iterator"
)

// listConstraints lists constraints available for a project.
func listConstraints(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := orgpolicy.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &orgpolicypb.ListConstraintsRequest{
		Parent: parent,
	}

	it := client.ListConstraints(ctx, req)
	for {
		constraint, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list constraints: %w", err)
		}
		fmt.Fprintf(w, "Constraint: %s\n", constraint.GetName())
	}

	return nil
}

// [END orgpolicy_v2_orgpolicy_constraints_list]
