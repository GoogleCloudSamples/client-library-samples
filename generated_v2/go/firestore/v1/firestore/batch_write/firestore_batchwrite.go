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

// [START firestore_v1_firestore_batch_write]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	firestorepb "cloud.google.com/go/firestore/apiv1/firestorepb"
)

// batchWrite performs atomic batch writes against Firestore documents.
func batchWrite(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	database := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	docName := fmt.Sprintf("%s/documents/users/example-user", database)

	req := &firestorepb.BatchWriteRequest{
		Database: database,
		Writes: []*firestorepb.Write{
			{
				Operation: &firestorepb.Write_Update{
					Update: &firestorepb.Document{
						Name: docName,
						Fields: map[string]*firestorepb.Value{
							"first": {
								ValueType: &firestorepb.Value_StringValue{
									StringValue: "Ada",
								},
							},
							"last": {
								ValueType: &firestorepb.Value_StringValue{
									StringValue: "Lovelace",
								},
							},
							"born": {
								ValueType: &firestorepb.Value_IntegerValue{
									IntegerValue: 1815,
								},
							},
						},
					},
				},
			},
		},
	}

	resp, err := client.BatchWrite(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchWrite: %w", err)
	}

	fmt.Fprintf(w, "Batch write succeeded: %d write result(s) returned.\n", len(resp.GetWriteResults()))
	for i, res := range resp.GetWriteResults() {
		fmt.Fprintf(w, "Result %d update time: %s\n", i, res.GetUpdateTime().AsTime())
	}

	return nil
}

// [END firestore_v1_firestore_batch_write]
