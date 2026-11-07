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

import (
	"context"
	"log"
	"os"
	"strings"
)

func main() {
	ctx := context.Background()
	w := os.Stdout

	// Support environment variables with optional CLI argument overrides
	listingID := os.Getenv("LISTING_ID")
	if listingID == "" && len(os.Args) > 1 {
		listingID = os.Args[1]
	}
	listingID = strings.Trim(listingID, "\"'")
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" && len(os.Args) > 2 {
		projectID = os.Args[2]
	}
	projectID = strings.Trim(projectID, "\"'")
	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" && len(os.Args) > 3 {
		locationID = os.Args[3]
	}
	locationID = strings.Trim(locationID, "\"'")
	dataExchangeID := os.Getenv("DATA_EXCHANGE_ID")
	if dataExchangeID == "" && len(os.Args) > 4 {
		dataExchangeID = os.Args[4]
	}
	dataExchangeID = strings.Trim(dataExchangeID, "\"'")
	datasetID := os.Getenv("DATASET_ID")
	if datasetID == "" && len(os.Args) > 5 {
		datasetID = os.Args[5]
	}
	datasetID = strings.Trim(datasetID, "\"'")

	if err := createListing(ctx, w, listingID, projectID, locationID, dataExchangeID, datasetID); err != nil {
		log.Fatalf("createListing failed: %v", err)
	}
}
