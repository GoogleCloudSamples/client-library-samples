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

// [START artifactregistry_v1_artifactregistry_repository_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
)

// createRepository creates a repository in Google Cloud Artifact Registry.
func createRepository(ctx context.Context, w io.Writer, repositoryID string) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is not set")
	}

	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
	repository := &artifactregistrypb.Repository{
		Format:      artifactregistrypb.Repository_DOCKER,
		Description: "Example Docker repository",
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("artifactregistry.NewClient: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.CreateRepositoryRequest{
		Parent:       parent,
		RepositoryId: repositoryID,
		Repository:   repository,
	}

	op, err := client.CreateRepository(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to create repository: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to wait for repository creation: %w", err)
	}

	fmt.Fprintf(w, "Created repository: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_repository_create]
