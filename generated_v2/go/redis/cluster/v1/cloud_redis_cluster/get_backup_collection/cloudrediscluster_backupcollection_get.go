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

// [START redis_v1_cloudrediscluster_backupcollection_get]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	"cloud.google.com/go/redis/cluster/apiv1/clusterpb"
)

// getBackupCollection retrieves details of an existing Redis Cluster backup collection.
func getBackupCollection(ctx context.Context, w io.Writer, projectID string, locationID string, backupCollectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backupCollections/%s", projectID, locationID, backupCollectionID)

	client, err := redis.NewCloudRedisClusterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClusterClient failed: %w", err)
	}
	defer client.Close()

	req := &clusterpb.GetBackupCollectionRequest{
		Name: name,
	}

	resp, err := client.GetBackupCollection(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBackupCollection failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved backup collection: %s\n", resp.GetName())
	return nil
}

// [END redis_v1_cloudrediscluster_backupcollection_get]
