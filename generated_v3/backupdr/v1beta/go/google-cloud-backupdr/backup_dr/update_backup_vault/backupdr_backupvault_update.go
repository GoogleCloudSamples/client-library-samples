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

// [START backupdr_v1beta_backupdr_backupvault_update]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	"cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBackupVault updates the description of an existing backup vault.
func updateBackupVault(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string) error {
	backupVault := &backupdrpb.BackupVault{
		Name:        fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID),
		Description: proto.String("Updated backup vault description"),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.UpdateBackupVaultRequest{
		BackupVault: backupVault,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateBackupVault(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateBackupVault: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated backup vault: %s\n", resp.GetName())
	return nil
}

// [END backupdr_v1beta_backupdr_backupvault_update]
