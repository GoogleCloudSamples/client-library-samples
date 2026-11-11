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

// [START netapp_v1_netapp_backupvault_get]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// getBackupVault retrieves information about an existing NetApp backup vault.
func getBackupVault(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.GetBackupVaultRequest{
		Name: name,
	}

	backupVault, err := client.GetBackupVault(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBackupVault failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved backup vault: %s\n", backupVault.GetName())

	return nil
}

// [END netapp_v1_netapp_backupvault_get]
