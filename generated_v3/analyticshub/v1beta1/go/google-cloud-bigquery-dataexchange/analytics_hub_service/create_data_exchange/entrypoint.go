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
	dataExchangeID := os.Getenv("DATA_EXCHANGE_ID")
	if dataExchangeID == "" && len(os.Args) > 1 {
		dataExchangeID = os.Args[1]
	}
	dataExchangeID = strings.Trim(dataExchangeID, "\"'")
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

	if err := createDataExchange(ctx, w, dataExchangeID, projectID, locationID); err != nil {
		log.Fatalf("createDataExchange failed: %v", err)
	}
}
