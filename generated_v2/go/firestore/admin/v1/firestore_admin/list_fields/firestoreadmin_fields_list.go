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

// [START firestore_admin_firestoreadmin_fields_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
	"google.golang.org/api/iterator"
)

// listFields lists the field configurations for a collection group.
func listFields(ctx context.Context, w io.Writer, projectID string, databaseID string, collectionID string) error {
	parent := fmt.Sprintf("projects/%s/databases/%s/collectionGroups/%s", projectID, databaseID, collectionID)

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	// Firestore Admin ListFields requires filtering for explicitly overridden fields or TTL configurations.
	req := &adminpb.ListFieldsRequest{
		Parent: parent,
		Filter: "indexConfig.usesAncestorConfig:false",
	}

	it := client.ListFields(ctx, req)
	var count int
	for {
		field, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListFields: %w", err)
		}
		fmt.Fprintf(w, "Field: %s\n", field.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No fields found.")
	}

	return nil
}

// [END firestore_admin_firestoreadmin_fields_list]
