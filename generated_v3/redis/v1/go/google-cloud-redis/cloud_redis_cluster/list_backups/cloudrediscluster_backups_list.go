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

// [START redis_v1_cloudrediscluster_backups_list]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	redispb "cloud.google.com/go/redis/cluster/apiv1/clusterpb"
	"google.golang.org/api/iterator"
)

// listBackups lists Redis cluster backups in a backup collection.
func listBackups(ctx context.Context, w io.Writer, projectID string, locationID string, backupCollectionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/backupCollections/%s", projectID, locationID, backupCollectionID)

	client, err := redis.NewCloudRedisClusterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClusterClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.ListBackupsRequest{
		Parent: parent,
	}

	it := client.ListBackups(ctx, req)
	for {
		backup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate backups: %w", err)
		}
		fmt.Fprintf(w, "Backup: %s\n", backup.GetName())
	}

	return nil
}

// [END redis_v1_cloudrediscluster_backups_list]
