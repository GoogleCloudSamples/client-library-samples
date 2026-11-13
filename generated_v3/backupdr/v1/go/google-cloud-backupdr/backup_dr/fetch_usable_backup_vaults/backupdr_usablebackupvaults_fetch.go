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

// [START backupdr_v1_backupdr_fetch_usable_backup_vaults]

import (
	"context"
	"errors"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
	"google.golang.org/api/iterator"
)

// fetchUsableBackupVaults retrieves usable backup vaults in a given project and location.
func fetchUsableBackupVaults(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.FetchUsableBackupVaultsRequest{
		Parent: parent,
	}

	it := client.FetchUsableBackupVaults(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("FetchUsableBackupVaults: %w", err)
		}
		fmt.Fprintf(w, "Usable backup vault: %s\n", resp.GetName())
	}

	return nil
}

// [END backupdr_v1_backupdr_fetch_usable_backup_vaults]
