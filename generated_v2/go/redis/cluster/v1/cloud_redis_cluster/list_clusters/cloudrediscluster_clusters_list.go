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

// [START redis_v1_cloudrediscluster_clusters_list]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/cluster/apiv1"
	redispb "cloud.google.com/go/redis/cluster/apiv1/clusterpb"
	"google.golang.org/api/iterator"
)

// listClusters retrieves a list of Cloud Redis clusters in the specified project and location.
func listClusters(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := redis.NewCloudRedisClusterClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClusterClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.ListClustersRequest{
		Parent: parent,
	}

	it := client.ListClusters(ctx, req)
	for {
		cluster, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListClusters: %w", err)
		}
		fmt.Fprintf(w, "Found cluster: %s (state: %s)\n", cluster.GetName(), cluster.GetState())
	}

	return nil
}

// [END redis_v1_cloudrediscluster_clusters_list]
