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

// [START analyticshub_v1beta1_analyticshubservice_listing_get]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/analyticshub/apiv1"
	analyticshubpb "cloud.google.com/go/bigquery/analyticshub/apiv1/analyticshubpb"
)

// getListing retrieves an existing listing within an Analytics Hub data exchange.
func getListing(ctx context.Context, w io.Writer, projectID string, locationID string, dataExchangeID string, listingID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dataExchanges/%s/listings/%s", projectID, locationID, dataExchangeID, listingID)

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("analyticshub.NewClient: %w", err)
	}
	defer client.Close()

	req := &analyticshubpb.GetListingRequest{
		Name: name,
	}

	listing, err := client.GetListing(ctx, req)
	if err != nil {
		return fmt.Errorf("GetListing: %w", err)
	}

	fmt.Fprintf(w, "Retrieved listing: %s\n", listing.GetName())
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_listing_get]
