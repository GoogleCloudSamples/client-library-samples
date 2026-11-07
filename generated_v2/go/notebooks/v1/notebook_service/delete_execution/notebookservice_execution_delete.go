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

// [START notebooks_v1_notebookservice_execution_delete]

import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1"
	notebookspb "cloud.google.com/go/notebooks/apiv1/notebookspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteExecution deletes an execution resource in Google Cloud Notebooks.
func deleteExecution(ctx context.Context, w io.Writer, projectID string, locationID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/executions/%s", projectID, locationID, executionID)

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient: %w", err)
	}
	defer client.Close()

	req := &notebookspb.DeleteExecutionRequest{
		Name: name,
	}

	op, err := client.DeleteExecution(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted execution: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteExecution: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted execution: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted execution: %s\n", name)
	return nil
}

// [END notebooks_v1_notebookservice_execution_delete]
