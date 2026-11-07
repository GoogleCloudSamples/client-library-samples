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

// [START artifactregistry_v1_artifactregistry_npmpackage_get]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	"cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
)

// getNpmPackage retrieves an npm package from an Artifact Registry repository.
func getNpmPackage(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, npmPackageID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/npmPackages/%s", projectID, locationID, repositoryID, npmPackageID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.GetNpmPackageRequest{
		Name: name,
	}

	resp, err := client.GetNpmPackage(ctx, req)
	if err != nil {
		return fmt.Errorf("GetNpmPackage: %w", err)
	}

	fmt.Fprintf(w, "Retrieved npm package: %s\n", resp.GetName())

	return nil
}

// [END artifactregistry_v1_artifactregistry_npmpackage_get]
