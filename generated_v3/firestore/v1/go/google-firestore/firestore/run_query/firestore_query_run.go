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

// [START firestore_v1_firestore_run_query]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
)

// Use the RunQuery method.
func runQuery(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	parent := fmt.Sprintf("projects/%s/databases/%s/documents", projectID, databaseID)
	structuredQuery := &firestorepb.StructuredQuery{
		From: []*firestorepb.StructuredQuery_CollectionSelector{
			{
				CollectionId: "cities",
			},
		},
	}

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("firestore.NewClient: %w", err)
	}
	defer client.Close()

	req := &firestorepb.RunQueryRequest{
		Parent: parent,
		QueryType: &firestorepb.RunQueryRequest_StructuredQuery{
			StructuredQuery: structuredQuery,
		},
	}

	stream, err := client.RunQuery(ctx, req)
	if err != nil {
		return fmt.Errorf("RunQuery: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv: %w", err)
		}
		if doc := resp.GetDocument(); doc != nil {
			fmt.Fprintf(w, "Document: %s\n", doc.GetName())
		}
	}

	return nil
}

// [END firestore_v1_firestore_run_query]
