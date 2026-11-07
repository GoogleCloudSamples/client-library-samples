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

// [START analyticshub_v1beta1_bigquerystorage_read_rows]

import (
	"context"
	"fmt"
	"io"
	"os"

	analyticshub "cloud.google.com/go/bigquery/storage/apiv1beta1"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1beta1/storagepb"
)

// readRows reads rows from a BigQuery table using a read session stream.
func readRows(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	client, err := analyticshub.NewBigQueryStorageClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryStorageClient failed: %w", err)
	}
	defer client.Close()

	sessionReq := &storagepb.CreateReadSessionRequest{
		Parent: fmt.Sprintf("projects/%s", projectID),
		TableReference: &storagepb.TableReference{
			ProjectId: "bigquery-public-data",
			DatasetId: "samples",
			TableId:   "shakespeare",
		},
		RequestedStreams: 1,
	}

	session, err := client.CreateReadSession(ctx, sessionReq)
	if err != nil {
		return fmt.Errorf("CreateReadSession failed: %w", err)
	}
	if len(session.GetStreams()) == 0 {
		return fmt.Errorf("no streams found in read session")
	}

	readPosition := &storagepb.StreamPosition{
		Stream: session.GetStreams()[0],
	}

	req := &storagepb.ReadRowsRequest{
		ReadPosition: readPosition,
	}

	stream, err := client.ReadRows(ctx, req)
	if err != nil {
		return fmt.Errorf("ReadRows failed: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv failed: %w", err)
		}
		fmt.Fprintf(w, "Received rows response: %d rows\n", resp.GetRowCount())
	}

	return nil
}

// [END analyticshub_v1beta1_bigquerystorage_read_rows]
