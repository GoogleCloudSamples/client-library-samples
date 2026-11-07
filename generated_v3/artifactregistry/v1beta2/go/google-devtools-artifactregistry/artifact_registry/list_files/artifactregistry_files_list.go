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

// [START artifactregistry_v1beta2_artifactregistry_files_list]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	"cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
	"google.golang.org/api/iterator"
)

// listFiles lists files in the specified Artifact Registry repository.
func listFiles(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.ListFilesRequest{
		Parent: parent,
	}

	it := client.ListFiles(ctx, req)
	for {
		file, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve file: %w", err)
		}
		fmt.Fprintf(w, "File: %s\n", file.GetName())
	}

	return nil
}

// [END artifactregistry_v1beta2_artifactregistry_files_list]
