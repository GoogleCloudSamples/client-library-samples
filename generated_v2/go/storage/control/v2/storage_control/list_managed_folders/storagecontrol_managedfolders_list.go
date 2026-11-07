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

// [START storage_v2_storagecontrol_managedfolders_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
	"google.golang.org/api/iterator"
)

// listManagedFolders lists all managed folders in a Cloud Storage bucket.
func listManagedFolders(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	_ = projectID
	// Standard Cloud Storage buckets use "_" as the project identifier in the Storage Control API.
	parent := fmt.Sprintf("projects/_/buckets/%s", bucketID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.ListManagedFoldersRequest{
		Parent: parent,
	}

	it := client.ListManagedFolders(ctx, req)
	for {
		folder, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListManagedFolders: %w", err)
		}
		fmt.Fprintf(w, "Managed folder: %s\n", folder.GetName())
	}

	return nil
}

// [END storage_v2_storagecontrol_managedfolders_list]
