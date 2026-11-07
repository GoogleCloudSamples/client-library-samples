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

// [START dataplex_v1_datascanservice_datascan_get]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// getDataScan retrieves a Dataplex data scan resource.
func getDataScan(ctx context.Context, w io.Writer, projectID string, locationID string, dataScanID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dataScans/%s", projectID, locationID, dataScanID)

	client, err := dataplex.NewDataScanClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataScanClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.GetDataScanRequest{
		Name: name,
		View: dataplexpb.GetDataScanRequest_FULL,
	}

	resp, err := client.GetDataScan(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDataScan: %w", err)
	}

	fmt.Fprintf(w, "Retrieved data scan: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_datascanservice_datascan_get]
