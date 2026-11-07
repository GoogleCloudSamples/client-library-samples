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

// [START dataform_v1beta1_dataform_query_repository_directory_contents]

import (
	"context"
	"errors"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// queryRepositoryDirectoryContents queries the contents of a Dataform repository directory.
func queryRepositoryDirectoryContents(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.QueryRepositoryDirectoryContentsRequest{
		Name: name,
	}

	it := client.QueryRepositoryDirectoryContents(ctx, req)
	for {
		entry, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to read directory contents: %w", err)
		}

		if entry.GetDirectory() != "" {
			fmt.Fprintf(w, "Directory: %s\n", entry.GetDirectory())
		} else if entry.GetFile() != "" {
			fmt.Fprintf(w, "File: %s\n", entry.GetFile())
		}
	}

	return nil
}

// [END dataform_v1beta1_dataform_query_repository_directory_contents]
