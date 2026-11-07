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

// [START dataform_v1beta1_dataform_workspace_delete]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// deleteWorkspace deletes a Dataform workspace.
func deleteWorkspace(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.DeleteWorkspaceRequest{
		Name: name,
	}

	if err := client.DeleteWorkspace(ctx, req); err != nil {
		return fmt.Errorf("DeleteWorkspace failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted workspace: %s\n", name)
	return nil
}

// [END dataform_v1beta1_dataform_workspace_delete]
