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

// [START dataform_v1_dataform_workspace_create]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1"
	dataformpb "cloud.google.com/go/dataform/apiv1/dataformpb"
)

// createWorkspace creates a Dataform workspace in a repository.
func createWorkspace(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)
	workspace := &dataformpb.Workspace{}

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("dataform.NewClient: %w", err)
	}
	defer client.Close()

	req := &dataformpb.CreateWorkspaceRequest{
		Parent:      parent,
		Workspace:   workspace,
		WorkspaceId: workspaceID,
	}

	resp, err := client.CreateWorkspace(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWorkspace: %w", err)
	}

	fmt.Fprintf(w, "Created workspace: %s\n", resp.GetName())
	return nil
}

// [END dataform_v1_dataform_workspace_create]
