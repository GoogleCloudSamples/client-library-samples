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

// [START alloydb_v1_alloydbadmin_supporteddatabaseflags_list]

import (
	"context"
	"fmt"
	"io"

	alloydb "cloud.google.com/go/alloydb/apiv1"
	alloydbpb "cloud.google.com/go/alloydb/apiv1/alloydbpb"
	"google.golang.org/api/iterator"
)

// listSupportedDatabaseFlags lists the database flags supported by AlloyDB in a location.
func listSupportedDatabaseFlags(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := alloydb.NewAlloyDBAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("alloydb.NewAlloyDBAdminClient: %w", err)
	}
	defer client.Close()

	req := &alloydbpb.ListSupportedDatabaseFlagsRequest{
		Parent: parent,
	}

	it := client.ListSupportedDatabaseFlags(ctx, req)
	for {
		flag, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Supported database flag: %s\n", flag.GetName())
	}

	return nil
}

// [END alloydb_v1_alloydbadmin_supporteddatabaseflags_list]
