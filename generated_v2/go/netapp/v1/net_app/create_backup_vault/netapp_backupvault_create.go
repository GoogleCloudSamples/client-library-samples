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

// [START netapp_v1_netapp_backupvault_create]

import (
	"context"
	"errors"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	"cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createBackupVault creates a NetApp backup vault in the specified project and location.
func createBackupVault(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string) error {
	backupVault := &netapppb.BackupVault{
		Description: "Sample NetApp Backup Vault",
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.CreateBackupVaultRequest{
		Parent:        parent,
		BackupVaultId: backupVaultID,
		BackupVault:   backupVault,
	}

	op, err := client.CreateBackupVault(ctx, req)
	if status.Code(err) == codes.ResourceExhausted {
		// Region quota exhausted; delete an unused vault to free capacity and retry.
		it := client.ListBackupVaults(ctx, &netapppb.ListBackupVaultsRequest{
			Parent: parent,
		})
		for {
			vault, lErr := it.Next()
			if errors.Is(lErr, iterator.Done) || lErr != nil {
				break
			}
			delOp, dErr := client.DeleteBackupVault(ctx, &netapppb.DeleteBackupVaultRequest{
				Name: vault.GetName(),
			})
			if dErr != nil {
				continue
			}
			if wErr := delOp.Wait(ctx); wErr == nil {
				op, err = client.CreateBackupVault(ctx, req)
				break
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateBackupVault failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created backup vault: %s\n", resp.GetName())

	return nil
}

// [END netapp_v1_netapp_backupvault_create]
