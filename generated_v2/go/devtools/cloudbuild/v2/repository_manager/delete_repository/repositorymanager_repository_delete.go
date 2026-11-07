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

// [START cloudbuild_v2_repositorymanager_repository_delete]

import (
	"context"
	"fmt"
	"io"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv2"
	cloudbuildpb "cloud.google.com/go/cloudbuild/apiv2/cloudbuildpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteRepository deletes a Cloud Build repository.
func deleteRepository(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string, repositoryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connections/%s/repositories/%s", projectID, locationID, connectionID, repositoryID)

	client, err := cloudbuild.NewRepositoryManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRepositoryManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudbuildpb.DeleteRepositoryRequest{
		Name: name,
	}

	op, err := client.DeleteRepository(ctx, req)
	if err != nil {
		// Treat NotFound as success to ensure idempotent deletion.
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted repository: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteRepository failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted repository: %s\n", name)
			return nil
		}
		return fmt.Errorf("waiting for DeleteRepository operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted repository: %s\n", name)
	return nil
}

// [END cloudbuild_v2_repositorymanager_repository_delete]
