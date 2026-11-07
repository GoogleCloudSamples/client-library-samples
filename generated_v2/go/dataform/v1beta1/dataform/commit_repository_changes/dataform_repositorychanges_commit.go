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

// [START dataform_v1beta1_dataform_commit_repository_changes]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// commitRepositoryChanges commits changes to a Dataform repository.
func commitRepositoryChanges(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)
	commitMetadata := &dataformpb.CommitMetadata{
		Author: &dataformpb.CommitAuthor{
			Name:         "Dataform User",
			EmailAddress: "dataform-user@example.com",
		},
		CommitMessage: "Commit changes via Dataform API",
	}

	writeFile := &dataformpb.CommitRepositoryChangesRequest_FileOperation_WriteFile{
		Contents: []byte("config { type: 'view' }\nSELECT 1 AS sample_column\n"),
	}
	fileOperations := map[string]*dataformpb.CommitRepositoryChangesRequest_FileOperation{
		"definitions/sample.sqlx": {
			Operation: &dataformpb.CommitRepositoryChangesRequest_FileOperation_WriteFile_{
				WriteFile: writeFile,
			},
		},
	}

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.CommitRepositoryChangesRequest{
		Name:           name,
		CommitMetadata: commitMetadata,
		FileOperations: fileOperations,
	}

	_, err = client.CommitRepositoryChanges(ctx, req)
	if err != nil {
		return fmt.Errorf("CommitRepositoryChanges failed: %w", err)
	}

	fmt.Fprintf(w, "Committed repository changes to %s\n", name)
	return nil
}

// [END dataform_v1beta1_dataform_commit_repository_changes]
