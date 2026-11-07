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

// [START firestore_v1_firestore_document_create]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
)

// createDocument creates a new document in a specified collection using the CreateDocument RPC method.
func createDocument(ctx context.Context, w io.Writer, collectionID string, projectID string, databaseID string) error {
	parent := fmt.Sprintf("projects/%s/databases/%s/documents", projectID, databaseID)
	document := &firestorepb.Document{
		Fields: map[string]*firestorepb.Value{
			"title": {
				ValueType: &firestorepb.Value_StringValue{
					StringValue: "Example title",
				},
			},
			"status": {
				ValueType: &firestorepb.Value_StringValue{
					StringValue: "active",
				},
			},
		},
	}

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &firestorepb.CreateDocumentRequest{
		Parent:       parent,
		CollectionId: collectionID,
		Document:     document,
	}

	response, err := client.CreateDocument(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDocument failed: %w", err)
	}

	fmt.Fprintf(w, "Created document: %s\n", response.GetName())
	return nil
}

// [END firestore_v1_firestore_document_create]
