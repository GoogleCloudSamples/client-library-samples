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

// [START dataform_v1beta1_dataform_fetch_git_ahead_behind]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// fetchGitAheadBehind fetches the number of commits a workspace is ahead of or behind a remote Git branch.
func fetchGitAheadBehind(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.FetchGitAheadBehindRequest{
		Name: name,
	}

	resp, err := client.FetchGitAheadBehind(ctx, req)
	if err != nil {
		return fmt.Errorf("FetchGitAheadBehind failed: %w", err)
	}

	fmt.Fprintf(w, "Commits ahead: %d, commits behind: %d\n", resp.GetCommitsAhead(), resp.GetCommitsBehind())
	return nil
}

// [END dataform_v1beta1_dataform_fetch_git_ahead_behind]
