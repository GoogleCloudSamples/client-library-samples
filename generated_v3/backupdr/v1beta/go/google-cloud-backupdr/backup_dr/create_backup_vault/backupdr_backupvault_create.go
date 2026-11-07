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

// [START backupdr_v1beta_backupdr_backupvault_create]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
)

// createBackupVault creates a backup vault in the specified project and location.
func createBackupVault(ctx context.Context, w io.Writer, backupVaultID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backupVault := &backupdrpb.BackupVault{
		Description: proto.String("Backup vault created via Go SDK"),
		// Set minimum enforced retention to 3 days (259200 seconds) to avoid unnecessary retention costs.
		BackupMinimumEnforcedRetentionDuration: &durationpb.Duration{
			Seconds: 259200,
		},
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.CreateBackupVaultRequest{
		Parent:        parent,
		BackupVaultId: backupVaultID,
		BackupVault:   backupVault,
	}

	op, err := client.CreateBackupVault(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBackupVault: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created backup vault: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_backupvault_create]
