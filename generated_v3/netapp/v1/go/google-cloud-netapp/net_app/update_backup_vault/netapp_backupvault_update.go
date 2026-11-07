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

// [START netapp_v1_netapp_backupvault_update]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBackupVault updates an existing Google Cloud NetApp backup vault description.
func updateBackupVault(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string) error {
	backupVault := &netapppb.BackupVault{
		Name:        fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID),
		Description: "Updated description for the backup vault",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.UpdateBackupVaultRequest{
		UpdateMask:  updateMask,
		BackupVault: backupVault,
	}

	op, err := client.UpdateBackupVault(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateBackupVault failed: %w", err)
	}

	vault, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated backup vault: %s\n", vault.GetName())
	return nil
}

// [END netapp_v1_netapp_backupvault_update]
