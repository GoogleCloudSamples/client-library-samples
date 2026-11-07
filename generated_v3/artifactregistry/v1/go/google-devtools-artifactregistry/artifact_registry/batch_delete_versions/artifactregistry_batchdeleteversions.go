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

// [START artifactregistry_v1_artifactregistry_versions_batchdelete]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
)

// batchDeleteVersions deletes the specified package versions in a repository.
func batchDeleteVersions(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, packageID string, versionID string) error {
	names := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s/versions/%s", projectID, locationID, repositoryID, packageID, versionID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s", projectID, locationID, repositoryID, packageID)
	req := &artifactregistrypb.BatchDeleteVersionsRequest{
		Parent: parent,
		Names:  []string{names},
	}

	op, err := client.BatchDeleteVersions(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchDeleteVersions failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted versions: %s\n", names)
	return nil
}

// [END artifactregistry_v1_artifactregistry_versions_batchdelete]
