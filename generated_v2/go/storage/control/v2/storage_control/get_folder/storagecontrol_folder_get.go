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

// [START storage_v2_storagecontrol_folder_get]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// getFolder retrieves metadata for a specified folder.
func getFolder(ctx context.Context, w io.Writer, projectID string, bucketID string, folderID string) error {
	// Cloud Storage Control API uses "_" as the project identifier for bucket resources.
	_ = projectID
	name := fmt.Sprintf("projects/_/buckets/%s/folders/%s", bucketID, folderID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.GetFolderRequest{
		Name: name,
	}

	folder, err := client.GetFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("GetFolder: %w", err)
	}

	fmt.Fprintf(w, "Retrieved folder: %s\n", folder.GetName())
	return nil
}

// [END storage_v2_storagecontrol_folder_get]
