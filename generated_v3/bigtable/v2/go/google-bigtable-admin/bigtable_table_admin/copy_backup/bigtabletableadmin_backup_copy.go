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

// [START bigtableadmin_v2_bigtabletableadmin_copy_backup]

import (
	"context"
	"fmt"
	"io"
	"time"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	bigtableadminpb "google.golang.org/genproto/googleapis/bigtable/admin/v2"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// copyBackup creates a copy of an existing Bigtable backup.
func copyBackup(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string, backupID string) error {
	expireTime := timestamppb.New(time.Now().Add(24 * time.Hour))
	sourceBackup := fmt.Sprintf("projects/%s/instances/%s/clusters/%s/backups/%s", projectID, instanceID, clusterID, backupID)
	parent := fmt.Sprintf("projects/%s/instances/%s/clusters/%s", projectID, instanceID, clusterID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	// Cloud Bigtable rejects backup copy requests when the source backup is too close to expiration.
	source, err := client.GetBackup(ctx, &bigtableadminpb.GetBackupRequest{Name: sourceBackup})
	if err != nil {
		return fmt.Errorf("GetBackup failed: %w", err)
	}
	if time.Until(source.GetExpireTime().AsTime()) < 24*time.Hour {
		_, err := client.UpdateBackup(ctx, &bigtableadminpb.UpdateBackupRequest{
			Backup: &bigtableadminpb.Backup{
				Name:       sourceBackup,
				ExpireTime: timestamppb.New(time.Now().Add(48 * time.Hour)),
			},
			UpdateMask: &fieldmaskpb.FieldMask{Paths: []string{"expire_time"}},
		})
		if err != nil {
			return fmt.Errorf("UpdateBackup failed: %w", err)
		}
	}

	// Destination backup ID must differ from the source backup ID within the same cluster.
	copyBackupID := fmt.Sprintf("%s-copy", backupID)

	req := &bigtableadminpb.CopyBackupRequest{
		Parent:       parent,
		BackupId:     copyBackupID,
		SourceBackup: sourceBackup,
		ExpireTime:   expireTime,
	}

	op, err := client.CopyBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("CopyBackup failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Copied backup: %s\n", resp.GetName())

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_copy_backup]
