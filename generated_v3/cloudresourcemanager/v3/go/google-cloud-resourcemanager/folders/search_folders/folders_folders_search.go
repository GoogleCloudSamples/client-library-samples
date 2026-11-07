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

// [START cloudresourcemanager_v3_folders_folders_search]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
)

// searchFolders searches for folders that match the specified query.
func searchFolders(ctx context.Context, w io.Writer, query string) error {
	client, err := cloudresourcemanager.NewFoldersClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFoldersClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.SearchFoldersRequest{
		Query: query,
	}
	it := client.SearchFolders(ctx, req)
	count := 0
	for {
		folder, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Found folder: %s, display name: %s\n", folder.GetName(), folder.GetDisplayName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No folders found.")
	}

	return nil
}

// [END cloudresourcemanager_v3_folders_folders_search]
