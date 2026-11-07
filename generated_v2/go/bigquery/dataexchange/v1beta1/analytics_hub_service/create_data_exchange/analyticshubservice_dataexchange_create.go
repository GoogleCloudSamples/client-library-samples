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

// [START analyticshub_v1beta1_analyticshubservice_dataexchange_create]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/dataexchange/apiv1beta1"
	analyticshubpb "cloud.google.com/go/bigquery/dataexchange/apiv1beta1/dataexchangepb"
)

// Use the CreateDataExchange method.
func createDataExchange(ctx context.Context, w io.Writer, dataExchangeID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	dataExchange := &analyticshubpb.DataExchange{
		DisplayName: "Sample Data Exchange",
		Description: "A sample data exchange for analytics",
	}

	client, err := analyticshub.NewAnalyticsHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAnalyticsHubClient failed: %w", err)
	}
	defer client.Close()

	req := &analyticshubpb.CreateDataExchangeRequest{
		Parent:         parent,
		DataExchangeId: dataExchangeID,
		DataExchange:   dataExchange,
	}

	resp, err := client.CreateDataExchange(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDataExchange failed: %w", err)
	}

	fmt.Fprintf(w, "Created data exchange: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_dataexchange_create]
