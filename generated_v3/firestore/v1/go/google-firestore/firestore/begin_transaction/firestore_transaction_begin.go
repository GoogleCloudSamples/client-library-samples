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

// [START firestore_v1_firestore_begin_transaction]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	firestorepb "cloud.google.com/go/firestore/apiv1/firestorepb"
)

// beginTransaction starts a new transaction on the specified Firestore database.
func beginTransaction(ctx context.Context, w io.Writer, projectID string, databaseID string) error {
	database := fmt.Sprintf("projects/%s/databases/%s", projectID, databaseID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("firestore.NewClient: %w", err)
	}
	defer client.Close()

	req := &firestorepb.BeginTransactionRequest{
		Database: database,
	}

	resp, err := client.BeginTransaction(ctx, req)
	if err != nil {
		return fmt.Errorf("BeginTransaction: %w", err)
	}

	fmt.Fprintf(w, "Started transaction: %x\n", resp.GetTransaction())
	return nil
}

// [END firestore_v1_firestore_begin_transaction]
