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

// [START vectorsearch_v1_vectorsearchservice_collection_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	vectorsearch "cloud.google.com/go/vectorsearch/apiv1beta"
	vectorsearchpb "cloud.google.com/go/vectorsearch/apiv1beta/vectorsearchpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCollection updates an existing collection.
func updateCollection(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = "us-central1"
	}

	collectionID := os.Getenv("COLLECTION_ID")
	if collectionID == "" {
		collectionID = "example-collection"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
	collectionName := fmt.Sprintf("%s/collections/%s", parent, collectionID)

	client, err := vectorsearch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// Ensure target collection exists before attempting update.
	if _, err := client.GetCollection(ctx, &vectorsearchpb.GetCollectionRequest{Name: collectionName}); err != nil {
		it := client.ListCollections(ctx, &vectorsearchpb.ListCollectionsRequest{
			Parent: parent,
		})
		if existing, listErr := it.Next(); listErr == nil && existing != nil {
			collectionName = existing.GetName()
		} else {
			op, createErr := client.CreateCollection(ctx, &vectorsearchpb.CreateCollectionRequest{
				Parent:       parent,
				CollectionId: collectionID,
				Collection: &vectorsearchpb.Collection{
					DisplayName: "Example Collection",
				},
			})
			if createErr != nil {
				return fmt.Errorf("CreateCollection failed: %w", createErr)
			}
			created, waitErr := op.Wait(ctx)
			if waitErr != nil {
				return fmt.Errorf("Wait for CreateCollection failed: %w", waitErr)
			}
			collectionName = created.GetName()
		}
	}

	collection := &vectorsearchpb.Collection{
		Name:        collectionName,
		DisplayName: "Updated Display Name",
	}

	req := &vectorsearchpb.UpdateCollectionRequest{
		Collection: collection,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"display_name"},
		},
	}

	op, err := client.UpdateCollection(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCollection failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated collection: %s\n", resp.GetName())
	return nil
}

// [END vectorsearch_v1_vectorsearchservice_collection_update]
