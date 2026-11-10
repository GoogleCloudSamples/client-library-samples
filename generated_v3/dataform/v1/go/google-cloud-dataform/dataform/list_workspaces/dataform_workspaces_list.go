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

// [START dataform_v1_dataform_workspaces_list]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// listWorkspaces lists the Dataform workspaces in a repository.
func listWorkspaces(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.ListWorkspacesRequest{
		Parent: parent,
	}

	it := client.ListWorkspaces(ctx, req)
	for {
		workspace, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListWorkspaces failed: %w", err)
		}
		fmt.Fprintf(w, "Workspace: %s\n", workspace.GetName())
	}

	return nil
}

// [END dataform_v1_dataform_workspaces_list]
