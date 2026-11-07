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

// [START dataform_v1beta1_dataform_query_directory_contents]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// queryDirectoryContents queries the contents of a Dataform workspace directory.
func queryDirectoryContents(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, workspaceID string) error {
	workspace := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/workspaces/%s", projectID, locationID, repositoryID, workspaceID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.QueryDirectoryContentsRequest{
		Workspace: workspace,
	}

	it := client.QueryDirectoryContents(ctx, req)
	for {
		entry, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to query directory contents: %w", err)
		}

		if file := entry.GetFile(); file != "" {
			fmt.Fprintf(w, "File: %s\n", file)
		} else if dir := entry.GetDirectory(); dir != "" {
			fmt.Fprintf(w, "Directory: %s\n", dir)
		}
	}

	return nil
}

// [END dataform_v1beta1_dataform_query_directory_contents]
