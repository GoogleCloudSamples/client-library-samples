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

// [START bigtableadmin_v2_bigtabletableadmin_backup_get]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// getBackup retrieves metadata for a Cloud Bigtable backup.
func getBackup(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string, backupID string) error {
	name := fmt.Sprintf("projects/%s/instances/%s/clusters/%s/backups/%s", projectID, instanceID, clusterID, backupID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetBackupRequest{
		Name: name,
	}

	backup, err := client.GetBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBackup failed: %w", err)
	}

	fmt.Fprintf(w, "Backup name: %s\n", backup.GetName())
	fmt.Fprintf(w, "Source table: %s\n", backup.GetSourceTable())
	fmt.Fprintf(w, "State: %s\n", backup.GetState())
	fmt.Fprintf(w, "Size (bytes): %d\n", backup.GetSizeBytes())

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_backup_get]
