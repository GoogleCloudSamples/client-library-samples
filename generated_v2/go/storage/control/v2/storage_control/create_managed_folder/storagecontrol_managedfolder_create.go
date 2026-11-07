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

// [START storage_v2_storagecontrol_managedfolder_create]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// createManagedFolder creates a managed folder in a Cloud Storage bucket.
func createManagedFolder(ctx context.Context, w io.Writer, managedFolderID string, projectID string, bucketID string) error {
	_ = projectID
	parent := fmt.Sprintf("projects/_/buckets/%s", bucketID)
	managedFolder := &controlpb.ManagedFolder{}

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	req := &controlpb.CreateManagedFolderRequest{
		Parent:          parent,
		ManagedFolder:   managedFolder,
		ManagedFolderId: managedFolderID,
	}

	response, err := client.CreateManagedFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateManagedFolder: %w", err)
	}

	fmt.Fprintf(w, "Created managed folder: %s\n", response.GetName())
	return nil
}

// [END storage_v2_storagecontrol_managedfolder_create]
