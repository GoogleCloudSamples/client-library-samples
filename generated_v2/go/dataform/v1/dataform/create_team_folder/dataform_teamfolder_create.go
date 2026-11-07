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

// [START dataform_v1_dataform_teamfolder_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// createTeamFolder creates a new team folder in Dataform.
func createTeamFolder(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	teamFolder := &dataformpb.TeamFolder{
		DisplayName: fmt.Sprintf("example-team-folder-%d", time.Now().UnixNano()),
	}

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.CreateTeamFolderRequest{
		Parent:     parent,
		TeamFolder: teamFolder,
	}

	resp, err := client.CreateTeamFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTeamFolder: %w", err)
	}

	fmt.Fprintf(w, "Created team folder: %s\n", resp.GetName())
	return nil
}

// [END dataform_v1_dataform_teamfolder_create]
