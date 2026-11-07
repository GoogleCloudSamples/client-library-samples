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

// [START analyticshub_v1beta1_analyticshubservice_listing_create]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/dataexchange/apiv1beta1"
	analyticshubpb "cloud.google.com/go/bigquery/dataexchange/apiv1beta1/dataexchangepb"
)

// createListing creates a new listing in a BigQuery Analytics Hub data exchange.
func createListing(ctx context.Context, w io.Writer, listingID string, projectID string, locationID string, dataExchangeID string, datasetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/dataExchanges/%s", projectID, locationID, dataExchangeID)
	listing := &analyticshubpb.Listing{
		DisplayName: "Sample Listing",
		Source: &analyticshubpb.Listing_BigqueryDataset{
			BigqueryDataset: &analyticshubpb.Listing_BigQueryDatasetSource{
				Dataset: fmt.Sprintf("projects/%s/datasets/%s", projectID, datasetID),
			},
		},
	}

	client, err := analyticshub.NewAnalyticsHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAnalyticsHubClient: %w", err)
	}
	defer client.Close()

	req := &analyticshubpb.CreateListingRequest{
		Parent:    parent,
		ListingId: listingID,
		Listing:   listing,
	}

	resp, err := client.CreateListing(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateListing: %w", err)
	}

	fmt.Fprintf(w, "Listing created: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_listing_create]
