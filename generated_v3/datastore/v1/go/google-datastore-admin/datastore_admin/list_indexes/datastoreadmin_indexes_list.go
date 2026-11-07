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

// [START datastore_v1_datastoreadmin_indexes_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	datastore "cloud.google.com/go/datastore/admin/apiv1"
	"google.golang.org/api/iterator"
	datastoreadminpb "google.golang.org/genproto/googleapis/datastore/admin/v1"
)

// listIndexes lists Datastore composite indexes in a project.
func listIndexes(ctx context.Context, w io.Writer) error {
	client, err := datastore.NewDatastoreAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDatastoreAdminClient: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is required")
	}

	req := &datastoreadminpb.ListIndexesRequest{
		ProjectId: projectID,
	}

	it := client.ListIndexes(ctx, req)
	for {
		index, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListIndexes iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Index ID: %s, Kind: %s, State: %s\n", index.GetIndexId(), index.GetKind(), index.GetState())
	}

	return nil
}

// [END datastore_v1_datastoreadmin_indexes_list]
