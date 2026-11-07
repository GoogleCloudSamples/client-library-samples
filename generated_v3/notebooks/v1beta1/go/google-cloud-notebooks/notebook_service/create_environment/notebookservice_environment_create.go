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

// [START notebooks_v1beta1_notebookservice_environment_create]

import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1beta1"
	notebookspb "cloud.google.com/go/notebooks/apiv1beta1/notebookspb"
)

// createEnvironment creates a new notebook environment.
func createEnvironment(ctx context.Context, w io.Writer, environmentID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	environment := &notebookspb.Environment{
		ImageType: &notebookspb.Environment_ContainerImage{
			ContainerImage: &notebookspb.ContainerImage{
				Repository: "gcr.io/deeplearning-platform-release/base-cpu",
			},
		},
	}

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient: %w", err)
	}
	defer client.Close()

	req := &notebookspb.CreateEnvironmentRequest{
		Parent:        parent,
		EnvironmentId: environmentID,
		Environment:   environment,
	}

	op, err := client.CreateEnvironment(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEnvironment: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created environment: %s\n", resp.GetName())
	return nil
}

// [END notebooks_v1beta1_notebookservice_environment_create]
