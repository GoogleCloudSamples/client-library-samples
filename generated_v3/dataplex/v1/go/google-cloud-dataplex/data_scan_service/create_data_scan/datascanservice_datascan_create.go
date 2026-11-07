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

// [START dataplex_v1_datascanservice_datascan_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// createDataScan creates a data scan for a BigQuery table and waits for completion.
func createDataScan(ctx context.Context, w io.Writer, projectID string, locationID string, dataScanID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	dataScan := &dataplexpb.DataScan{
		Data: &dataplexpb.DataSource{
			Source: &dataplexpb.DataSource_Resource{
				Resource: fmt.Sprintf("//bigquery.googleapis.com/projects/%s/datasets/sample_dataset/tables/sample_table", projectID),
			},
		},
		Spec: &dataplexpb.DataScan_DataProfileSpec{
			DataProfileSpec: &dataplexpb.DataProfileSpec{},
		},
	}

	client, err := dataplex.NewDataScanClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataScanClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateDataScanRequest{
		Parent:     parent,
		DataScanId: dataScanID,
		DataScan:   dataScan,
	}

	op, err := client.CreateDataScan(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDataScan failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created data scan: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_datascanservice_datascan_create]
