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

// [START backupdr_v1_backupdr_backups_list]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
	"google.golang.org/api/iterator"
)

// listBackups lists backups in a given project and location.
func listBackups(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/backupVaults/-/dataSources/-", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.ListBackupsRequest{
		Parent: parent,
	}

	it := client.ListBackups(ctx, req)
	var count int
	for {
		backup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListBackups iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No backups found.")
	}

	return nil
}

// [END backupdr_v1_backupdr_backups_list]
