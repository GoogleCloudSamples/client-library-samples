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

// [START gkebackup_v1_backupforgke_backupchannel_delete]

import (
	"context"
	"fmt"
	"io"

	gkebackup "cloud.google.com/go/gkebackup/apiv1"
	gkebackuppb "cloud.google.com/go/gkebackup/apiv1/gkebackuppb"
)

// deleteBackupChannel deletes a BackupChannel in Backup for GKE.
func deleteBackupChannel(ctx context.Context, w io.Writer, projectID string, locationID string, backupChannelID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupChannels/%s", projectID, locationID, backupChannelID)

	client, err := gkebackup.NewBackupForGKEClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBackupForGKEClient failed: %w", err)
	}
	defer client.Close()

	req := &gkebackuppb.DeleteBackupChannelRequest{
		Name: name,
	}

	op, err := client.DeleteBackupChannel(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteBackupChannel failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("waiting for DeleteBackupChannel operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted BackupChannel: %s\n", name)
	return nil
}

// [END gkebackup_v1_backupforgke_backupchannel_delete]
