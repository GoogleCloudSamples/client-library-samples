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

// [START artifactregistry_v1_artifactregistry_package_update]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updatePackage updates annotations for a package in an Artifact Registry repository.
func updatePackage(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, packageID string) error {
	pkg := &artifactregistrypb.Package{
		Name: fmt.Sprintf("projects/%s/locations/%s/repositories/%s/packages/%s", projectID, locationID, repositoryID, packageID),
		Annotations: map[string]string{
			"example-key": "example-value",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"annotations"},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdatePackageRequest{
		Package:    pkg,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdatePackage(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePackage: %w", err)
	}

	fmt.Fprintf(w, "Updated package: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_package_update]
