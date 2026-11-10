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

// [START file_v1_cloudfilestoremanager_backup_delete]

import (
	"context"
	"fmt"
	"io"

	file "cloud.google.com/go/filestore/apiv1"
	filestorepb "cloud.google.com/go/filestore/apiv1/filestorepb"
)

// Use the DeleteBackup method.
func deleteBackup(ctx context.Context, w io.Writer, locationID string, backupID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backups/%s", projectID, locationID, backupID)

	client, err := file.NewCloudFilestoreManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFilestoreManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &filestorepb.DeleteBackupRequest{
		Name: name,
	}

	op, err := client.DeleteBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteBackup failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("DeleteBackup operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted backup: %s\n", name)

	return nil
}

// [END file_v1_cloudfilestoremanager_backup_delete]
