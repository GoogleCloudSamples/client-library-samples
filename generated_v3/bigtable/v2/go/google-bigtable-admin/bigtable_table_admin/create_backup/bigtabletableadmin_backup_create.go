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

// [START bigtableadmin_v2_bigtabletableadmin_backup_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Use the CreateBackup method.
func createBackup(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string, backupID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s/clusters/%s", projectID, instanceID, clusterID)
	backup := &adminpb.Backup{
		SourceTable: fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID),
		ExpireTime:  timestamppb.New(time.Now().Add(7 * time.Hour)),
	}

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateBackupRequest{
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

// [END bigtableadmin_v2_bigtabletableadmin_backup_create]
