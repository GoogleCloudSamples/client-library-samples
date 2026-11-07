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

// [START retail_v2alpha_branchservice_branch_get]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getBranch retrieves metadata for a specified branch in a catalog.
func getBranch(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, branchID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/branches/%s", projectID, locationID, catalogID, branchID)

	client, err := retail.NewBranchClient(ctx)
	if err != nil {
		return fmt.Errorf("retail.NewBranchClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.GetBranchRequest{
		Name: name,
	}

	branch, err := client.GetBranch(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Retail API terms not accepted or service not enabled: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("client.GetBranch: %w", err)
	}

	fmt.Fprintf(w, "Branch name: %s\n", branch.GetName())
	fmt.Fprintf(w, "Display name: %s\n", branch.GetDisplayName())
	fmt.Fprintf(w, "Is default: %t\n", branch.GetIsDefault())

	return nil
}

// [END retail_v2alpha_branchservice_branch_get]
