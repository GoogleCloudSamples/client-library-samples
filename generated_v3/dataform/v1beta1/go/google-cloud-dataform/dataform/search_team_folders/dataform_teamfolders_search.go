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

// [START dataform_v1beta1_dataform_teamfolders_search]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// searchTeamFolders searches team folders in the specified Dataform location.
func searchTeamFolders(ctx context.Context, w io.Writer, projectID string, locationID string, location string) error {
	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	if location == "" {
		location = fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	}

	req := &dataformpb.SearchTeamFoldersRequest{
		Location: location,
	}

	it := client.SearchTeamFolders(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate team folders: %w", err)
		}
		fmt.Fprintf(w, "Team folder: %s\n", resp.GetTeamFolder().GetName())
	}

	return nil
}

// [END dataform_v1beta1_dataform_teamfolders_search]
