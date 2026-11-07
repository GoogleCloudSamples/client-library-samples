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

// [START redis_v1_cloudredis_import_instance]

import (
	"context"
	"fmt"
	"io"

	redis "cloud.google.com/go/redis/apiv1"
	redispb "cloud.google.com/go/redis/apiv1/redispb"
)

// importInstance imports Redis data from Cloud Storage into a Memorystore for Redis instance.
func importInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)
	inputConfig := &redispb.InputConfig{
		Source: &redispb.InputConfig_GcsSource{
			GcsSource: &redispb.GcsSource{
				Uri: "gs://example-bucket/example-backup.rdb",
			},
		},
	}

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient: %w", err)
	}
	defer client.Close()

	req := &redispb.ImportInstanceRequest{
		Name:        name,
		InputConfig: inputConfig,
	}

	op, err := client.ImportInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportInstance: %w", err)
	}

	fmt.Fprintf(w, "Import instance operation started: %s\n", op.Name())
	return nil
}

// [END redis_v1_cloudredis_import_instance]
