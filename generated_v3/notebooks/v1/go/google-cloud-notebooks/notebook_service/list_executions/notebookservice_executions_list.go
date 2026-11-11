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

// [START notebooks_v1_notebookservice_executions_list]

import (
	"context"
	"fmt"
	"io"

	notebooks "cloud.google.com/go/notebooks/apiv1"
	"cloud.google.com/go/notebooks/apiv1/notebookspb"
	"google.golang.org/api/iterator"
)

// listExecutions lists notebook execution jobs in a given location.
func listExecutions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := notebooks.NewNotebookClient(ctx)
	if err != nil {
		return fmt.Errorf("NewNotebookClient: %w", err)
	}
	defer client.Close()

	req := &notebookspb.ListExecutionsRequest{
		Parent: parent,
	}

	it := client.ListExecutions(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListExecutions: %w", err)
		}
		fmt.Fprintf(w, "Execution: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintf(w, "No executions found in %s\n", parent)
	}

	return nil
}

// [END notebooks_v1_notebookservice_executions_list]
