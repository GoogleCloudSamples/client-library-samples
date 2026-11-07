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

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	redispb "cloud.google.com/go/redis/cluster/apiv1/clusterpb"
	"google.golang.org/protobuf/proto"
)

// [START redis_v1_cloudrediscluster_cluster_create]

// createCluster creates a Cloud Redis cluster in the specified project and location.
func createCluster(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	cluster := &redispb.Cluster{
		ShardCount: proto.Int32(3),
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

	// Cluster creation is a long-running operation that takes several minutes.
	fmt.Fprintf(w, "Started cluster creation operation: %s\n", op.Name())
	return nil
}

// [END redis_v1_cloudrediscluster_cluster_create]
