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

// [START dataform_v1beta1_dataform_fetch_repository_history]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// fetchRepositoryHistory retrieves the commit history for a Dataform repository.
func fetchRepositoryHistory(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("dataform.NewClient: %w", err)
	}
	defer client.Close()

	req := &dataformpb.FetchRepositoryHistoryRequest{
		Name: name,
	}

	it := client.FetchRepositoryHistory(ctx, req)
	count := 0
	for {
		entry, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("client.FetchRepositoryHistory: %w", err)
		}
		count++
		fmt.Fprintf(w, "Commit SHA: %s, Message: %s\n", entry.GetCommitSha(), entry.GetCommitMessage())
	}
	fmt.Fprintf(w, "Fetched %d commits for repository: %s\n", count, name)

	return nil
}

// [END dataform_v1beta1_dataform_fetch_repository_history]
