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

// [START dataform_v1_dataform_teamfoldertree_delete]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// deleteTeamFolderTree deletes a Dataform team folder tree.
func deleteTeamFolderTree(ctx context.Context, w io.Writer, projectID string, locationID string, teamFolderID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/teamFolders/%s", projectID, locationID, teamFolderID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.DeleteTeamFolderTreeRequest{
		Name: name,
	}

	op, err := client.DeleteTeamFolderTree(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteTeamFolderTree failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted team folder tree: %s\n", name)
	return nil
}

// [END dataform_v1_dataform_teamfoldertree_delete]
