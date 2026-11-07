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

// [START developerknowledge_v1_developerknowledge_documentchunks_search]

import (
	"context"
	"fmt"
	"io"

	developerknowledge "cloud.google.com/go/developerknowledge/apiv1"
	developerknowledgepb "cloud.google.com/go/developerknowledge/apiv1/developerknowledgepb"
	"google.golang.org/api/iterator"
)

// searchDocumentChunks searches developer knowledge document chunks matching a query.
func searchDocumentChunks(ctx context.Context, w io.Writer) error {
	query := "Cloud Storage"

	client, err := developerknowledge.NewDeveloperKnowledgeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDeveloperKnowledgeClient failed: %w", err)
	}
	defer client.Close()

	req := &developerknowledgepb.SearchDocumentChunksRequest{
		Query: query,
	}

	it := client.SearchDocumentChunks(ctx, req)
	// Iterate through the first page of results to avoid exhausting request quotas.
	for i := 0; i < 10; i++ {
		chunk, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchDocumentChunks failed: %w", err)
		}
		fmt.Fprintf(w, "Document chunk: %s\n", chunk.GetDocument().GetTitle())
	}

	return nil
}

// [END developerknowledge_v1_developerknowledge_documentchunks_search]
