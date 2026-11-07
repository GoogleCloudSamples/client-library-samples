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

// [START artifactregistry_v1_artifactregistry_repositories_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
	"google.golang.org/api/iterator"
)

// listRepositories lists Artifact Registry repositories in a given project and location.
func listRepositories(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = os.Getenv("GOOGLE_CLOUD_REGION")
	}
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.ListRepositoriesRequest{
		Parent: parent,
	}

	it := client.ListRepositories(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next repository iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Repository: %s\n", resp.GetName())
	}

	return nil
}

// [END artifactregistry_v1_artifactregistry_repositories_list]
