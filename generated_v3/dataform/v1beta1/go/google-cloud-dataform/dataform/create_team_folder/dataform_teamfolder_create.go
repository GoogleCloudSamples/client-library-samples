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

// [START dataform_v1beta1_dataform_teamfolder_create]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// createTeamFolder creates a new Dataform team folder in the specified project and location.
func createTeamFolder(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	teamFolder := &dataformpb.TeamFolder{
		DisplayName: "Team Folder Demo",
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

	response, err := client.CreateTeamFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTeamFolder failed: %w", err)
	}

	fmt.Fprintf(w, "Created team folder: %s\n", response.GetName())
	return nil
}

// [END dataform_v1beta1_dataform_teamfolder_create]
