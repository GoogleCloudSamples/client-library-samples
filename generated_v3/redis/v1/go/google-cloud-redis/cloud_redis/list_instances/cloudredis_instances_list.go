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

// [START redis_v1_cloudredis_instances_list]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1beta1"
	redispb "cloud.google.com/go/redis/apiv1beta1/redispb"
	"google.golang.org/api/iterator"
)

// Use the ListInstances method.
func listInstances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient: %w", err)
	}
	defer client.Close()

	req := &redispb.ListInstancesRequest{
		Parent: parent,
	}

	it := client.ListInstances(ctx, req)
	for {
		instance, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListInstances iterator error: %w", err)
		}
		fmt.Fprintf(w, "Instance name: %s\n", instance.GetName())
	}

	return nil
}

// [END redis_v1_cloudredis_instances_list]
