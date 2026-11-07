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

// [START dataform_v1beta1_dataform_fetch_file_git_statuses]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// fetchFileGitStatuses fetches uncommitted Git changes in a Dataform workspace.
func fetchFileGitStatuses(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.FetchFileGitStatusesRequest{
		Name: name,
	}

	resp, err := client.FetchFileGitStatuses(ctx, req)
	if err != nil {
		return fmt.Errorf("FetchFileGitStatuses failed: %w", err)
	}

	fmt.Fprintf(w, "Uncommitted file changes for %s:\n", name)
	for _, change := range resp.GetUncommittedFileChanges() {
		fmt.Fprintf(w, "Path: %s, State: %s\n", change.GetPath(), change.GetState())
	}

	return nil
}

// [END dataform_v1beta1_dataform_fetch_file_git_statuses]
