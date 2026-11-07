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

// [START analyticshub_v1beta1_analyticshubservice_listing_delete]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/analyticshub/apiv1"
	analyticshubpb "cloud.google.com/go/bigquery/analyticshub/apiv1/analyticshubpb"
)

// deleteListing deletes a listing from a data exchange in Analytics Hub.
func deleteListing(ctx context.Context, w io.Writer, projectID string, locationID string, dataExchangeID string, listingID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dataExchanges/%s/listings/%s", projectID, locationID, dataExchangeID, listingID)

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("analyticshub.NewClient: %w", err)
	}
	defer client.Close()

	req := &analyticshubpb.DeleteListingRequest{
		Name: name,
	}

	if err := client.DeleteListing(ctx, req); err != nil {
		return fmt.Errorf("DeleteListing: %w", err)
	}

	fmt.Fprintf(w, "Deleted listing: %s\n", name)
	return nil
}

// [END analyticshub_v1beta1_analyticshubservice_listing_delete]
