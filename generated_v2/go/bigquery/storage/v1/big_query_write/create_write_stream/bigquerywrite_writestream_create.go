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

// [START bigquerystorage_v1_bigquerywrite_writestream_create]

import (
	"context"
	"fmt"
	"io"

	bigquerystorage "cloud.google.com/go/bigquery/storage/apiv1"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1/storagepb"
)

// Use the CreateWriteStream method.
func createWriteStream(ctx context.Context, w io.Writer, projectID string, datasetID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/datasets/%s/tables/%s", projectID, datasetID, tableID)
	writeStream := &storagepb.WriteStream{
		Type: storagepb.WriteStream_COMMITTED,
	}

	client, err := bigquerystorage.NewBigQueryWriteClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryWriteClient failed: %w", err)
	}
	defer client.Close()

	req := &storagepb.CreateWriteStreamRequest{
		Parent:      parent,
		WriteStream: writeStream,
	}

	resp, err := client.CreateWriteStream(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWriteStream failed: %w", err)
	}

	fmt.Fprintf(w, "Created write stream: %s\n", resp.GetName())
	return nil
}

// [END bigquerystorage_v1_bigquerywrite_writestream_create]
