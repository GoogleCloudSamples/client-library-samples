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

// [START redis_v1beta1_cloudredis_instanceauthstring_get]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1beta1"
	redispb "cloud.google.com/go/redis/apiv1beta1/redispb"
)

// getInstanceAuthString gets the AUTH string for a Redis instance.
func getInstanceAuthString(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.GetInstanceAuthStringRequest{
		Name: name,
	}

	resp, err := client.GetInstanceAuthString(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInstanceAuthString failed: %w", err)
	}

	fmt.Fprintf(w, "Instance AUTH string: %s\n", resp.GetAuthString())

	return nil
}

// [END redis_v1beta1_cloudredis_instanceauthstring_get]
