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

// [START firestore_admin_firestoreadmin_indexes_list]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	firestore "cloud.google.com/go/firestore/apiv1/admin"
	adminpb "cloud.google.com/go/firestore/apiv1/admin/adminpb"
	"google.golang.org/api/iterator"
)

// listIndexes lists composite indexes for a collection group in a Firestore database.
func listIndexes(ctx context.Context, w io.Writer, projectID string, databaseID string, collectionID string) error {
	if projectID == "" {
		if env := os.Getenv("GOOGLE_CLOUD_PROJECT"); env != "" {
			projectID = env
		} else if env := os.Getenv("PROJECT_ID"); env != "" {
			projectID = env
		}
	}

	var parent string
	if strings.HasPrefix(projectID, "projects/") && strings.Contains(projectID, "/databases/") {
		parent = projectID
		if !strings.Contains(parent, "/collectionGroups/") {
			if collectionID == "" {
				collectionID = "-"
			}
			parent = fmt.Sprintf("%s/collectionGroups/%s", parent, collectionID)
		}
	} else {
		projectID = strings.TrimPrefix(projectID, "projects/")
		if databaseID == "" {
			databaseID = "(default)"
		} else if idx := strings.LastIndex(databaseID, "/"); idx != -1 {
			databaseID = databaseID[idx+1:]
		}
		if collectionID == "" {
			collectionID = "-"
		} else if idx := strings.LastIndex(collectionID, "/"); idx != -1 {
			collectionID = collectionID[idx+1:]
		}
		parent = fmt.Sprintf("projects/%s/databases/%s/collectionGroups/%s", projectID, databaseID, collectionID)
	}

	client, err := firestore.NewFirestoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFirestoreAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListIndexesRequest{
		Parent: parent,
	}

	it := client.ListIndexes(ctx, req)
	for {
		index, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListIndexes failed: %w", err)
		}
		fmt.Fprintf(w, "Index: %s, State: %s\n", index.GetName(), index.GetState())
	}

	return nil
}

// [END firestore_admin_firestoreadmin_indexes_list]
