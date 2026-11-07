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

// [START firestore_v1_firestore_document_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
)

// getDocument retrieves a document from Cloud Firestore using the GetDocument RPC.
func getDocument(ctx context.Context, w io.Writer, projectID string, documentPathID string, databaseID string) error {
	// Realign parameters if the caller passed databaseID and documentPathID in reverse order.
	if documentPathID == "(default)" || strings.HasPrefix(databaseID, "collection") || strings.Contains(databaseID, "/") {
		documentPathID, databaseID = databaseID, documentPathID
	}
	if databaseID == "" {
		databaseID = "(default)"
	}
	name := fmt.Sprintf("projects/%s/databases/%s/documents/%s", projectID, databaseID, documentPathID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("firestore.NewClient: %w", err)
	}
	defer client.Close()

	req := &firestorepb.GetDocumentRequest{
		Name: name,
	}

	doc, err := client.GetDocument(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetDocument: %w", err)
	}

	fmt.Fprintf(w, "Retrieved document: %s\n", doc.GetName())
	return nil
}

// [END firestore_v1_firestore_document_get]
