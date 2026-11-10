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

// [START storage_v2_storagecontrol_rename_folder]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// renameFolder renames an existing folder in a Cloud Storage bucket.
func renameFolder(ctx context.Context, w io.Writer, projectID string, bucketID string, folderID string, destinationFolderID string) error {
	_ = projectID
	name := fmt.Sprintf("projects/_/buckets/%s/folders/%s", bucketID, folderID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	req := &controlpb.RenameFolderRequest{
		Name:                name,
		DestinationFolderId: destinationFolderID,
	}

	op, err := client.RenameFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("RenameFolder failed: %w", err)
	}

	folder, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Renamed folder to: %s\n", folder.GetName())

	return nil
}

// [END storage_v2_storagecontrol_rename_folder]
