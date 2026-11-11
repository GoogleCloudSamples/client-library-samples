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

// [START analyticshub_v1beta1_bigquerystorage_readsession_create]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/storage/apiv1beta1"
	"cloud.google.com/go/bigquery/storage/apiv1beta1/storagepb"
)

// createReadSession creates a BigQuery Storage read session.
func createReadSession(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	tableReference := &storagepb.TableReference{
		ProjectId: projectID,
		DatasetId: "example_dataset",
		TableId:   "example_table",
	}

	client, err := analyticshub.NewBigQueryStorageClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryStorageClient failed: %w", err)
	}
	defer client.Close()

	req := &storagepb.CreateReadSessionRequest{
		Parent:         parent,
		TableReference: tableReference,
	}
	session, err := client.CreateReadSession(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateReadSession: %w", err)
	}

	fmt.Fprintf(w, "Created read session: %s\n", session.GetName())
	return nil
}

// [END analyticshub_v1beta1_bigquerystorage_readsession_create]
