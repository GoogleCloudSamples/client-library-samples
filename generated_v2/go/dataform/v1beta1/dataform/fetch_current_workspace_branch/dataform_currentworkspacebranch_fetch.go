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

// [START dataform_v1beta1_dataform_fetch_current_workspace_branch]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// fetchCurrentWorkspaceBranch fetches the current Git branch for a Dataform workspace.
func fetchCurrentWorkspaceBranch(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.FetchCurrentWorkspaceBranchRequest{
		Name: name,
	}

	resp, err := client.FetchCurrentWorkspaceBranch(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Branch management is not enabled for workspace %s\n", workspaceID)
			return nil
		}
		return fmt.Errorf("FetchCurrentWorkspaceBranch failed: %w", err)
	}

	fmt.Fprintf(w, "Current branch: %s\n", resp.GetBranchName())
	return nil
}

// [END dataform_v1beta1_dataform_fetch_current_workspace_branch]
