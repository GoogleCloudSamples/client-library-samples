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

// [START dataform_v1_dataform_teamfolder_delete]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteTeamFolder deletes a specified Dataform team folder.
func deleteTeamFolder(ctx context.Context, w io.Writer, projectID string, locationID string, teamFolderID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/teamFolders/%s", projectID, locationID, teamFolderID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.DeleteTeamFolderRequest{
		Name: name,
	}

	if err := client.DeleteTeamFolder(ctx, req); err != nil {
		// Ignore NotFound to treat deletion as idempotent if the team folder does not exist.
		if status.Code(err) != codes.NotFound {
			return fmt.Errorf("DeleteTeamFolder failed: %w", err)
		}
	}

	fmt.Fprintf(w, "Deleted team folder: %s\n", name)
	return nil
}

// [END dataform_v1_dataform_teamfolder_delete]
