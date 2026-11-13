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

// [START backupdr_v1_backupdr_backup_delete]

import (
	"context"
	"fmt"
	"io"
	"time"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteBackup deletes an existing backup from a data source within a backup vault.
func deleteBackup(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string, dataSourceID string, backupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s/dataSources/%s/backups/%s", projectID, locationID, backupVaultID, dataSourceID, backupID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// Ensure the backup enforced retention period has expired before calling DeleteBackup.
	backup, err := client.GetBackup(ctx, &backupdrpb.GetBackupRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("GetBackup failed: %w", err)
	}

	if ret := backup.GetEnforcedRetentionEndTime(); ret != nil && ret.AsTime().After(time.Now()) {
		fmt.Fprintf(w, "Backup %s cannot be deleted before enforced retention period has expired: %s\n", name, ret.AsTime().Format(time.RFC3339))
		return nil
	}

	req := &backupdrpb.DeleteBackupRequest{
		Name: name,
	}

	op, err := client.DeleteBackup(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Backup %s cannot be deleted: %v\n", name, err)
			return nil
		}
		return fmt.Errorf("DeleteBackup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Backup %s cannot be deleted: %v\n", name, err)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted backup: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1_backupdr_backup_delete]
