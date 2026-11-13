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

// [START backupdr_v1_backupdr_backupvault_delete]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
)

// deleteBackupVault deletes an existing backup vault.
func deleteBackupVault(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.DeleteBackupVaultRequest{
		Name: name,
	}

	op, err := client.DeleteBackupVault(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteBackupVault: %w", err)
	}

	// DeleteBackupVault is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted backup vault: %s\n", name)
	return nil
}

// [END backupdr_v1_backupdr_backupvault_delete]
