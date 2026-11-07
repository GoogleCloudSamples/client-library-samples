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

// [START artifactregistry_v1_artifactregistry_file_update]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	"cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateFile updates metadata on a file in an Artifact Registry repository.
func updateFile(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, fileID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"annotations"},
	}
	file := &artifactregistrypb.File{
		Name: fmt.Sprintf("projects/%s/locations/%s/repositories/%s/files/%s", projectID, locationID, repositoryID, fileID),
		Annotations: map[string]string{
			"updated": "true",
		},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("artifactregistry.NewClient: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdateFileRequest{
		File:       file,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateFile(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateFile: %w", err)
	}

	fmt.Fprintf(w, "Updated file: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_file_update]
