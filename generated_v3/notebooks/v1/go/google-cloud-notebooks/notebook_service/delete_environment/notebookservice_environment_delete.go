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

// [START notebooks_v1_notebookservice_environment_delete]
import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1"
	notebookspb "cloud.google.com/go/notebooks/apiv1/notebookspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteEnvironment deletes an environment resource.
func deleteEnvironment(ctx context.Context, w io.Writer, projectID string, locationID string, environmentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/environments/%s", projectID, locationID, environmentID)

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient failed: %w", err)
	}
	defer client.Close()

	req := &notebookspb.DeleteEnvironmentRequest{
		Name: name,
	}

	op, err := client.DeleteEnvironment(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Environment not found: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteEnvironment failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Environment not found: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted environment: %s\n", name)
	return nil
}

// [END notebooks_v1_notebookservice_environment_delete]
