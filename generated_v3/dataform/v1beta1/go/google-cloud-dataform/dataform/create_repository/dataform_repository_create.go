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

// [START dataform_v1beta1_dataform_repository_create]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// createRepository creates a Dataform repository in the specified project and location.
func createRepository(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	repository := &dataformpb.Repository{}

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("dataform.NewClient: %w", err)
	}
	defer client.Close()

	req := &dataformpb.CreateRepositoryRequest{
		Parent:       parent,
		RepositoryId: repositoryID,
		Repository:   repository,
	}

	resp, err := client.CreateRepository(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateRepository: %w", err)
	}

	fmt.Fprintf(w, "Created repository: %s\n", resp.GetName())
	return nil
}

// [END dataform_v1beta1_dataform_repository_create]
