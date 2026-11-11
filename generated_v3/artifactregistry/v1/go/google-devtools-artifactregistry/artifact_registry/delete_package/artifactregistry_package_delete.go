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

// [START artifactregistry_v1_artifactregistry_package_delete]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	"cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
)

// deletePackage deletes a package from an Artifact Registry repository.
func deletePackage(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, packageID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s", projectID, locationID, repositoryID, packageID)

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.DeletePackageRequest{
		Name: name,
	}

	op, err := client.DeletePackage(ctx, req)
	if err != nil {
		return fmt.Errorf("DeletePackage failed: %w", err)
	}

	// DeletePackage returns a long-running operation.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("op.Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted package: %s\n", name)

	return nil
}

// [END artifactregistry_v1_artifactregistry_package_delete]
