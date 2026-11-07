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

import (
	"context"
	"fmt"
	"io"
	"strings"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// [START dataform_v1beta1_dataform_branch_delete]

// deleteBranch deletes a specified Git branch from a Dataform workspace.
func deleteBranch(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string, branch string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("dataform.NewClient: %w", err)
	}
	defer client.Close()

	req := &dataformpb.DeleteBranchRequest{
		Name:   name,
		Branch: branch,
	}

	if _, err := client.DeleteBranch(ctx, req); err != nil {
		// Workspaces without remote Git repositories configured do not have branch management enabled.
		if status.Code(err) == codes.FailedPrecondition && strings.Contains(err.Error(), "Branch management is not enabled") {
			fmt.Fprintf(w, "Branch management is not enabled for workspace %s\n", workspaceID)
			return nil
		}
		return fmt.Errorf("client.DeleteBranch: %w", err)
	}

	fmt.Fprintf(w, "Deleted branch: %s\n", branch)
	return nil
}

// [END dataform_v1beta1_dataform_branch_delete]
