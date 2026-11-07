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

// [START artifactregistry_v1_artifactregistry_version_delete]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
)

// Use the DeleteVersion method.
func deleteVersion(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, packageID string, versionID string) error {
	if versionID == "latest" {
		return fmt.Errorf("version aliases such as 'latest' are not permitted; provide an exact version identifier")
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.DeleteVersionRequest{
		Name: fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s/versions/%s", projectID, locationID, repositoryID, packageID, versionID),
	}

	op, err := client.DeleteVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteVersion failed: %w", err)
	}

	// DeleteVersion is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted version: %s\n", req.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_version_delete]
