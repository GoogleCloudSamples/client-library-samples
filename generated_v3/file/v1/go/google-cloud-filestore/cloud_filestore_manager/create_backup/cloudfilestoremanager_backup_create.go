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

// [START file_v1_cloudfilestoremanager_backup_create]

import (
	"context"
	"fmt"
	"io"

	file "cloud.google.com/go/filestore/apiv1"
	filestorepb "cloud.google.com/go/filestore/apiv1/filestorepb"
)

// createBackup creates a Filestore backup for a specified file share in an instance.
func createBackup(ctx context.Context, w io.Writer, locationID string, backupID string, instanceID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backup := &filestorepb.Backup{
		SourceInstance:  fmt.Sprintf("projects/%s/locations/%s-a/instances/%s", projectID, locationID, instanceID),
		SourceFileShare: "vol1",
		Description:     "Backup created via Filestore API",
	}

	client, err := file.NewCloudFilestoreManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFilestoreManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &filestorepb.CreateBackupRequest{
		Parent:   parent,
		BackupId: backupID,
		Backup:   backup,
	}

	op, err := client.CreateBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBackup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created backup: %s\n", resp.GetName())
	return nil
}

// [END file_v1_cloudfilestoremanager_backup_create]
