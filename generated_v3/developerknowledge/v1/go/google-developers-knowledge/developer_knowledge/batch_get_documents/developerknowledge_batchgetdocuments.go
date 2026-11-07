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

// [START developerknowledge_v1_developerknowledge_batch_get_documents]

import (
	"context"
	"fmt"
	"io"

	developerknowledge "cloud.google.com/go/developerknowledge/apiv1"
	developerknowledgepb "cloud.google.com/go/developerknowledge/apiv1/developerknowledgepb"
)

// batchGetDocuments retrieves documents from the Developer Knowledge corpus.
func batchGetDocuments(ctx context.Context, w io.Writer, documentID string) error {
	names := fmt.Sprintf("documents/%s", documentID)

	client, err := developerknowledge.NewDeveloperKnowledgeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDeveloperKnowledgeClient failed: %w", err)
	}
	defer client.Close()

	req := &developerknowledgepb.BatchGetDocumentsRequest{
		Names: []string{names},
	}

	resp, err := client.BatchGetDocuments(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchGetDocuments failed: %w", err)
	}

	for _, doc := range resp.GetDocuments() {
		fmt.Fprintf(w, "Retrieved document: %s\n", doc.GetName())
	}

	return nil
}

// [END developerknowledge_v1_developerknowledge_batch_get_documents]
