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

// [START backupdr_v1beta_backupdr_backup_get]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
)

// getBackup retrieves a Backup resource by its resource name.
func getBackup(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string, datasourceID string, backupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s/dataSources/%s/backups/%s",
		projectID, locationID, backupVaultID, datasourceID, backupID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.GetBackupRequest{
		Name: name,
	}

	resp, err := client.GetBackup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBackup failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved backup: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_backup_get]
