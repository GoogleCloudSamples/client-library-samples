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

// [START storage_v2_storagecontrol_folders_list]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
	"google.golang.org/api/iterator"
)

// listFolders lists folders within a bucket enabled with hierarchical namespace.
func listFolders(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	_ = projectID
	// The Storage Control API requires "_" for global-namespaced buckets.
	parent := fmt.Sprintf("projects/_/buckets/%s", bucketID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	req := &controlpb.ListFoldersRequest{
		Parent: parent,
	}

	it := client.ListFolders(ctx, req)
	for {
		folder, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListFolders iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Found folder: %s\n", folder.GetName())
	}

	return nil
}

// [END storage_v2_storagecontrol_folders_list]
