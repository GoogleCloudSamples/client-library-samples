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

// [START storage_v2_storagecontrol_folder_create]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// createFolder creates a folder in a hierarchical namespace bucket.
func createFolder(ctx context.Context, w io.Writer, folderID string, projectID string, bucketID string) error {
	// Storage Control API requires "_" as the project identifier for global-namespaced buckets.
	_ = projectID
	parent := fmt.Sprintf("projects/_/buckets/%s", bucketID)
	folder := &controlpb.Folder{}

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.CreateFolderRequest{
		Parent:   parent,
		FolderId: folderID,
		Folder:   folder,
	}

	resp, err := client.CreateFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateFolder: %w", err)
	}

	fmt.Fprintf(w, "Created folder: %s\n", resp.GetName())
	return nil
}

// [END storage_v2_storagecontrol_folder_create]
