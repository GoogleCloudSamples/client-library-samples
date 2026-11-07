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

// [START netapp_v1_netapp_backups_list]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/api/iterator"
)

// listBackups lists NetApp backups within a specified backup vault.
func listBackups(ctx context.Context, w io.Writer, backupVaultID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s", projectID, locationID, backupVaultID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.ListBackupsRequest{
		Parent: parent,
	}

	it := client.ListBackups(ctx, req)
	count := 0
	for {
		backup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next failed: %w", err)
		}
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No backups found.")
	}

	return nil
}

// [END netapp_v1_netapp_backups_list]
