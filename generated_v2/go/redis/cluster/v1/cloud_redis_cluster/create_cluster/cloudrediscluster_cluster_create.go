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

// [START redis_v1_cloudrediscluster_cluster_create]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	redispb "cloud.google.com/go/redis/cluster/apiv1/clusterpb"
)

// createCluster creates a Redis cluster in the specified location.
func createCluster(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	shardCount := int32(3)
	cluster := &redispb.Cluster{
		ShardCount: &shardCount,
		PscConfigs: []*redispb.PscConfig{
			{
				Network: fmt.Sprintf("projects/%s/global/networks/default", projectID),
			},
		},
	}

	client, err := redis.NewCloudRedisClusterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClusterClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.CreateClusterRequest{
		Parent:    parent,
		ClusterId: clusterID,
		Cluster:   cluster,
	}

	op, err := client.CreateCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCluster failed: %w", err)
	}

	fmt.Fprintf(w, "Cluster creation operation started: %s\n", op.Name())

	return nil
}

// [END redis_v1_cloudrediscluster_cluster_create]
