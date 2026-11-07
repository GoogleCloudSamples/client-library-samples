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

// [START redis_v1_cloudrediscluster_cluster_get]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	redispb "cloud.google.com/go/redis/cluster/apiv1/clusterpb"
)

// getCluster retrieves the configuration and state of a Redis cluster.
func getCluster(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)

	client, err := redis.NewCloudRedisClusterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClusterClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.GetClusterRequest{
		Name: name,
	}

	cluster, err := client.GetCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCluster failed: %w", err)
	}

	fmt.Fprintf(w, "Cluster name: %s\n", cluster.GetName())
	fmt.Fprintf(w, "Cluster state: %s\n", cluster.GetState())

	return nil
}

// [END redis_v1_cloudrediscluster_cluster_get]
