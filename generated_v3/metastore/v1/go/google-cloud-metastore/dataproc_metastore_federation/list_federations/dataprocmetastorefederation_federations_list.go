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

// [START metastore_v1_dataprocmetastorefederation_federations_list]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1beta"
	"cloud.google.com/go/metastore/apiv1beta/metastorepb"
	"google.golang.org/api/iterator"
)

// listFederations lists all Dataproc Metastore federations in a given project and location.
func listFederations(ctx context.Context, w io.Writer, locationID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := metastore.NewDataprocMetastoreFederationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreFederationClient failed: %w", err)
	}
	defer client.Close()

	req := &metastorepb.ListFederationsRequest{
		Parent: parent,
	}

	it := client.ListFederations(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListFederations iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Federation: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No federations found.")
	}

	return nil
}

// [END metastore_v1_dataprocmetastorefederation_federations_list]
