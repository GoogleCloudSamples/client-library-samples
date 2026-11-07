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

// [START artifactregistry_v1_artifactregistry_file_get]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	"cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
)

// getFile retrieves metadata for a specified file in an Artifact Registry repository.
func getFile(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, fileID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/files/%s", projectID, locationID, repositoryID, fileID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.GetFileRequest{
		Name: name,
	}

	resp, err := client.GetFile(ctx, req)
	if err != nil {
		return fmt.Errorf("GetFile: %w", err)
	}

	fmt.Fprintf(w, "File retrieved: %s (size: %d bytes)\n", resp.GetName(), resp.GetSizeBytes())
	return nil
}

// [END artifactregistry_v1_artifactregistry_file_get]
