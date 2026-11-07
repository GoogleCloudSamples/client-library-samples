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

// [START analyticshub_v1beta1_analyticshubservice_listing_update]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/analyticshub/apiv1"
	analyticshubpb "cloud.google.com/go/bigquery/analyticshub/apiv1/analyticshubpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateListing updates the description of an existing Analytics Hub listing.
func updateListing(ctx context.Context, w io.Writer, projectID string, locationID string, dataExchangeID string, listingID string) error {
	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("analyticshub.NewClient: %w", err)
	}
	defer client.Close()

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	listing := &analyticshubpb.Listing{
		Name:        fmt.Sprintf("projects/%s/locations/%s/dataExchanges/%s/listings/%s", projectID, locationID, dataExchangeID, listingID),
		Description: "Updated description of the listing",
	}

	req := &analyticshubpb.UpdateListingRequest{
		UpdateMask: updateMask,
		Listing:    listing,
	}

	response, err := client.UpdateListing(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateListing: %w", err)
	}

	fmt.Fprintf(w, "Updated listing: %s\n", response.GetName())
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_listing_update]
