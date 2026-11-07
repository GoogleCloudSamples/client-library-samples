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

// [START bigquerystorage_v1_bigqueryread_readsession_create]

import (
	"context"
	"fmt"
	"io"

	bigquerystorage "cloud.google.com/go/bigquery/storage/apiv1"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1/storagepb"
)

// Use the CreateReadSession method.
func createReadSession(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	readSession := &storagepb.ReadSession{
		Table:      "projects/bigquery-public-data/datasets/usa_names/tables/usa_1910_2013",
		DataFormat: storagepb.DataFormat_AVRO,
	}

	client, err := bigquerystorage.NewBigQueryReadClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryReadClient failed: %w", err)
	}
	defer client.Close()

	req := &storagepb.CreateReadSessionRequest{
		Parent:      parent,
		ReadSession: readSession,
		MaxStreamCount: 1,
	}

	resp, err := client.CreateReadSession(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateReadSession failed: %w", err)
	}

	fmt.Fprintf(w, "Created read session: %s\n", resp.GetName())
	return nil
}

// [END bigquerystorage_v1_bigqueryread_readsession_create]
