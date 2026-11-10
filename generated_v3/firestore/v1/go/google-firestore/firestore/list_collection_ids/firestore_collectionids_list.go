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

// [START firestore_v1_firestore_collectionids_list]

import (
	"context"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	"google.golang.org/api/iterator"
)

// listCollectionIds lists the subcollection IDs of a Firestore document.
func listCollectionIds(ctx context.Context, w io.Writer, projectID string, databaseID string, documentPathID string) error {
	parent := fmt.Sprintf("projects/%s/databases/%s/documents/%s", projectID, databaseID, documentPathID)

	client, err := firestore.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &firestorepb.ListCollectionIdsRequest{
		Parent: parent,
	}

	it := client.ListCollectionIds(ctx, req)
	for {
		collectionID, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate collection IDs: %w", err)
		}
		fmt.Fprintf(w, "Collection ID: %s\n", collectionID)
	}

	return nil
}

// [END firestore_v1_firestore_collectionids_list]
