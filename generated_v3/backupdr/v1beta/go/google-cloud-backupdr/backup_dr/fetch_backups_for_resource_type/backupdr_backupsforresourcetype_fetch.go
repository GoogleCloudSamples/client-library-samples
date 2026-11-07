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

// [START backupdr_v1beta_backupdr_fetch_backups_for_resource_type]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	"cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/api/iterator"
)

// fetchBackupsForResourceType retrieves backups for a unified resource type within a data source.
func fetchBackupsForResourceType(ctx context.Context, w io.Writer, projectID string, locationID string, backupVaultID string, datasourceID string, resourceType string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/backupVaults/%s/dataSources/%s", projectID, locationID, backupVaultID, datasourceID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.FetchBackupsForResourceTypeRequest{
		Parent:       parent,
		ResourceType: resourceType,
	}

	it := client.FetchBackupsForResourceType(ctx, req)
	var count int
	for {
		backup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to fetch backup: %w", err)
		}
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
		count++
	}

	fmt.Fprintf(w, "Fetched %d backup(s) for resource type: %s\n", count, resourceType)
	return nil
}

// [END backupdr_v1beta_backupdr_fetch_backups_for_resource_type]
