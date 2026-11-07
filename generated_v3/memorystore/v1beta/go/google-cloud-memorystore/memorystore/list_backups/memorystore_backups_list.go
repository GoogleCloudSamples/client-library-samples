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

// [START memorystore_v1beta_memorystore_backups_list]

import (
	"context"
	"fmt"
	"io"

	memorystore "cloud.google.com/go/memorystore/apiv1beta"
	memorystorepb "cloud.google.com/go/memorystore/apiv1beta/memorystorepb"
	"google.golang.org/api/iterator"
)

// listBackups lists backups in a Memorystore backup collection.
func listBackups(ctx context.Context, w io.Writer, projectID string, locationID string, backupCollectionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/backupCollections/%s", projectID, locationID, backupCollectionID)

	client, err := memorystore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &memorystorepb.ListBackupsRequest{
		Parent: parent,
	}

	it := client.ListBackups(ctx, req)
	var found bool
	for {
		backup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate backups: %w", err)
		}
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
		found = true
	}

	if !found {
		fmt.Fprintln(w, "No backups found.")
	}

	return nil
}

// [END memorystore_v1beta_memorystore_backups_list]
