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

// [START firestore_v1_firestore_batch_get_documents]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
)

// batchGetDocuments reads multiple documents in a single request.
func batchGetDocuments(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	database := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("firestore.NewClient: %w", err)
	}
	defer client.Close()

	req := &firestorepb.BatchGetDocumentsRequest{
		Database: database,
		Documents: []string{
			fmt.Sprintf("%s/documents/cities/SF", database),
			fmt.Sprintf("%s/documents/cities/LA", database),
		},
	}

	stream, err := client.BatchGetDocuments(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchGetDocuments: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv: %w", err)
		}

		switch result := resp.Result.(type) {
		case *firestorepb.BatchGetDocumentsResponse_Found:
			fmt.Fprintf(w, "Found document: %s\n", result.Found.GetName())
		case *firestorepb.BatchGetDocumentsResponse_Missing:
			fmt.Fprintf(w, "Missing document: %s\n", result.Missing)
		}
	}

	return nil
}

// [END firestore_v1_firestore_batch_get_documents]
