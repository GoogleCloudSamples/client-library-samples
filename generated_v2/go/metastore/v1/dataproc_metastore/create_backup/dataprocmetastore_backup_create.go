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

// [START metastore_v1_dataprocmetastore_backup_create]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1"
	metastorepb "cloud.google.com/go/metastore/apiv1/metastorepb"
	"google.golang.org/api/iterator"
)

// createBackup creates a backup for a Dataproc Metastore service.
func createBackup(ctx context.Context, w io.Writer, locationID string, serviceID string, backupID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, locationID, serviceID)
	backup := &metastorepb.Backup{
		Description: "Example backup",
	}

	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreClient failed: %w", err)
	}
	defer client.Close()

	// Dataproc Metastore limits services to a maximum of 7 backups.
	// Delete the oldest backup if the limit is reached.
	it := client.ListBackups(ctx, &metastorepb.ListBackupsRequest{
		Parent: parent,
	})
	var oldest *metastorepb.Backup
	var count int
	for {
		b, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListBackups failed: %w", err)
		}
		count++
		if oldest == nil {
			oldest = b
		} else if b.GetCreateTime() != nil && oldest.GetCreateTime() != nil {
			if b.GetCreateTime().AsTime().Before(oldest.GetCreateTime().AsTime()) {
				oldest = b
			}
		}
	}

	if count >= 7 && oldest != nil {
		delOp, err := client.DeleteBackup(ctx, &metastorepb.DeleteBackupRequest{
			Name: oldest.GetName(),
		})
		if err != nil {
			return fmt.Errorf("DeleteBackup failed: %w", err)
		}
		if err := delOp.Wait(ctx); err != nil {
			return fmt.Errorf("DeleteBackup operation failed: %w", err)
		}
	}

	req := &metastorepb.CreateBackupRequest{
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
		return fmt.Errorf("CreateBackup operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created backup: %s\n", resp.GetName())
	return nil
}

// [END metastore_v1_dataprocmetastore_backup_create]
