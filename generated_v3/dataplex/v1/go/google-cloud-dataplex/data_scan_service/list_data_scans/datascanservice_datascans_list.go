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

// [START dataplex_v1_datascanservice_datascans_list]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
)

// listDataScans retrieves all data scans in a project and location.
func listDataScans(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := dataplex.NewDataScanClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataScanClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.ListDataScansRequest{
		Parent: parent,
	}
	it := client.ListDataScans(ctx, req)
	for {
		scan, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListDataScans iteration failed: %w", err)
		}
		fmt.Fprintf(w, "DataScan: %s\n", scan.GetName())
	}

	return nil
}

// [END dataplex_v1_datascanservice_datascans_list]
