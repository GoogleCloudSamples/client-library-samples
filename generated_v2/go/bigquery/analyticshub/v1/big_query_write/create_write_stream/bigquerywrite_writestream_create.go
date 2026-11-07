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

// [START analyticshub_v1_bigquerywrite_writestream_create]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/bigquery/storage/apiv1"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1/storagepb"
)

// createWriteStream creates a new write stream for a BigQuery table.
func createWriteStream(ctx context.Context, w io.Writer, projectID string, datasetID string, tableID string) error {
	client, err := storage.NewBigQueryWriteClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryWriteClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/datasets/%s/tables/%s", projectID, datasetID, tableID)
	writeStream := &storagepb.WriteStream{
		Type: storagepb.WriteStream_PENDING,
	}

	req := &storagepb.CreateWriteStreamRequest{
		Parent:      parent,
		WriteStream: writeStream,
	}

	resp, err := client.CreateWriteStream(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWriteStream: %w", err)
	}

	fmt.Fprintf(w, "Created write stream: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1_bigquerywrite_writestream_create]
