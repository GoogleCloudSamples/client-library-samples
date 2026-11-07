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

// [START redis_v1beta1_cloudredis_instances_list]

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"strings"

	redis "cloud.google.com/go/redis/apiv1beta1"
	redispb "cloud.google.com/go/redis/apiv1beta1/redispb"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iterator"
)

// listInstances lists Cloud Redis instances in the specified location.
func listInstances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	if projectID == "" {
		if env := os.Getenv("GOOGLE_CLOUD_PROJECT"); env != "" {
			projectID = env
		} else if env := os.Getenv("PROJECT_ID"); env != "" {
			projectID = env
		} else if env := os.Getenv("GCP_PROJECT"); env != "" {
			projectID = env
		} else if env := os.Getenv("CLOUDSDK_CORE_PROJECT"); env != "" {
			projectID = env
		} else if creds, err := google.FindDefaultCredentials(ctx); err == nil && creds.ProjectID != "" {
			projectID = creds.ProjectID
		}
	}

	if locationID == "" {
		if env := os.Getenv("GOOGLE_CLOUD_REGION"); env != "" {
			locationID = env
		} else if env := os.Getenv("LOCATION_ID"); env != "" {
			locationID = env
		} else {
			locationID = "us-central1"
		}
	}

	// Normalize resource identifiers if prefixes, paths, or swapped arguments are provided.
	if strings.Contains(projectID, "/locations/") {
		parts := strings.Split(projectID, "/locations/")
		projectID = parts[0]
		if locationID == "" || locationID == "us-central1" {
			locationID = parts[1]
		}
	}
	projectID = strings.TrimPrefix(projectID, "projects/")
	projectID = strings.Trim(projectID, "/")

	locationID = strings.TrimPrefix(locationID, "locations/")
	locationID = strings.Trim(locationID, "/")

	isRegion := func(s string) bool {
		regions := []string{"us-", "europe-", "asia-", "australia-", "northamerica-", "southamerica-", "me-", "africa-"}
		for _, r := range regions {
			if strings.HasPrefix(s, r) {
				return true
			}
		}
		return false
	}
	if isRegion(projectID) && !isRegion(locationID) && locationID != "" {
		projectID, locationID = locationID, projectID
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := redis.NewCloudRedisClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudRedisClient failed: %w", err)
	}
	defer client.Close()

	req := &redispb.ListInstancesRequest{
		Parent: parent,
	}

	it := client.ListInstances(ctx, req)
	for {
		instance, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list instances: %w", err)
		}
		fmt.Fprintf(w, "Instance: %s\n", instance.GetName())
	}

	return nil
}

// [END redis_v1beta1_cloudredis_instances_list]
