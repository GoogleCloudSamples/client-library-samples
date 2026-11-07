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

// [START artifactregistry_v1beta2_artifactregistry_repository_create]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
)

// createRepository creates a new Artifact Registry repository.
func createRepository(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
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
		return fmt.Errorf("client.CreateRepository: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Created repository: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1beta2_artifactregistry_repository_create]
