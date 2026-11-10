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

// [START dataform_v1beta1_dataform_repositories_list]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/api/iterator"
)

// listRepositories lists Dataform repositories using the ListRepositories method.
func listRepositories(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %v", err)
	}
	defer client.Close()

	req := &dataformpb.ListRepositoriesRequest{
		Parent: parent,
	}

	it := client.ListRepositories(ctx, req)
	for {
		repo, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list repositories: %w", err)
		}
		fmt.Fprintf(w, "Repository: %s\n", repo.GetName())
	}

	return nil
}

// [END dataform_v1beta1_dataform_repositories_list]
