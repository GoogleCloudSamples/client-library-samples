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

// [START storage_v2_storagecontrol_managedfolder_delete]

import (
	"context"
	"fmt"
	"io"
	"strings"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// deleteManagedFolder deletes a specified managed folder from a Cloud Storage bucket.
func deleteManagedFolder(ctx context.Context, w io.Writer, projectID string, bucketID string, managedFolderID string) error {
	_ = projectID
	if managedFolderID != "" && !strings.HasSuffix(managedFolderID, "/") {
		managedFolderID += "/"
	}
	name := fmt.Sprintf("projects/_/buckets/%s/managedFolders/%s", bucketID, managedFolderID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.DeleteManagedFolderRequest{
		Name: name,
	}

	if err := client.DeleteManagedFolder(ctx, req); err != nil {
		return fmt.Errorf("DeleteManagedFolder: %w", err)
	}

	fmt.Fprintf(w, "Deleted managed folder: %s\n", name)
	return nil
}

// [END storage_v2_storagecontrol_managedfolder_delete]
