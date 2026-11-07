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

// [START artifactregistry_v1_artifactregistry_repository_update]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	"cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateRepository updates a repository description using the UpdateRepository method.
func updateRepository(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	repository := &artifactregistrypb.Repository{
		Name:        fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID),
		Description: "Updated repository description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdateRepositoryRequest{
		Repository: repository,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateRepository(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateRepository: %w", err)
	}

	fmt.Fprintf(w, "Updated repository: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_repository_update]
