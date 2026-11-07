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

// [START cloudresourcemanager_v2_folders_folders_search]

import (
	"context"
	"errors"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
)

// searchFolders searches for active folders.
func searchFolders(ctx context.Context, w io.Writer) error {
	client, err := cloudresourcemanager.NewFoldersClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFoldersClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.SearchFoldersRequest{
		Query: "state:ACTIVE",
	}

	it := client.SearchFolders(ctx, req)
	var count int
	for {
		folder, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchFolders iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Folder: %s (%s)\n", folder.GetName(), folder.GetDisplayName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No folders found.")
	}

	return nil
}

// [END cloudresourcemanager_v2_folders_folders_search]
