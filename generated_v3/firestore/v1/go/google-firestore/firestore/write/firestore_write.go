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

// [START firestore_v1_firestore_write]

import (
	"context"
	"fmt"
	"io"
	"strings"

	firestore "cloud.google.com/go/firestore/apiv1"
	firestorepb "cloud.google.com/go/firestore/apiv1/firestorepb"
)

// write performs mutations using the bidirectional Write streaming RPC.
func write(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	database := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	stream, err := client.Write(ctx)
	if err != nil {
		return fmt.Errorf("client.Write failed: %w", err)
	}

	// Initialize the stream. The initial request must only specify the database without writes.
	initReq := &firestorepb.WriteRequest{
		Database: database,
	}
	if err := stream.Send(initReq); err != nil {
		if strings.Contains(err.Error(), "Datastore Mode") {
			fmt.Fprintf(w, "Cloud Firestore API is not available for Firestore in Datastore Mode database: %s\n", database)
			return nil
		}
		return fmt.Errorf("stream.Send failed: %w", err)
	}

	// Receive the initial handshake response containing the stream token.
	initResp, err := stream.Recv()
	if err != nil {
		// Handle projects where the target database is configured in Datastore Mode.
		if strings.Contains(err.Error(), "Datastore Mode") {
			fmt.Fprintf(w, "Cloud Firestore API is not available for Firestore in Datastore Mode database: %s\n", database)
			return nil
		}
		return fmt.Errorf("stream.Recv failed: %w", err)
	}

	doc := &firestorepb.Document{
		Name: fmt.Sprintf("%s/documents/cities/LA", database),
		Fields: map[string]*firestorepb.Value{
			"name": {
				ValueType: &firestorepb.Value_StringValue{
					StringValue: "Los Angeles",
				},
			},
			"population": {
				ValueType: &firestorepb.Value_IntegerValue{
					IntegerValue: 3979563,
				},
			},
		},
	}

	writeOp := &firestorepb.Write{
		Operation: &firestorepb.Write_Update{
			Update: doc,
		},
	}

	writeReq := &firestorepb.WriteRequest{
		StreamToken: initResp.GetStreamToken(),
		Writes:      []*firestorepb.Write{writeOp},
	}
	if err := stream.Send(writeReq); err != nil {
		return fmt.Errorf("stream.Send failed: %w", err)
	}

	// Close the send direction to notify the server that all requests have been sent.
	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("stream.CloseSend failed: %w", err)
	}

	// Read subsequent responses until the stream finishes.
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			if strings.Contains(err.Error(), "Datastore Mode") {
				fmt.Fprintf(w, "Cloud Firestore API is not available for Firestore in Datastore Mode database: %s\n", database)
				return nil
			}
			return fmt.Errorf("stream.Recv failed: %w", err)
		}

		for _, result := range resp.GetWriteResults() {
			fmt.Fprintf(w, "Document update time: %s\n", result.GetUpdateTime().AsTime())
		}
	}

	return nil
}

// [END firestore_v1_firestore_write]
