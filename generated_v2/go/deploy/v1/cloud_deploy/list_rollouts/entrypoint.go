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
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" && len(os.Args) > 1 {
		projectID = os.Args[1]
	}
	projectID = strings.Trim(projectID, "\"'")
	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" && len(os.Args) > 2 {
		locationID = os.Args[2]
	}
	locationID = strings.Trim(locationID, "\"'")
	deliveryPipelineID := os.Getenv("DELIVERY_PIPELINE_ID")
	if deliveryPipelineID == "" && len(os.Args) > 3 {
		deliveryPipelineID = os.Args[3]
	}
	deliveryPipelineID = strings.Trim(deliveryPipelineID, "\"'")
	releaseID := os.Getenv("RELEASE_ID")
	if releaseID == "" && len(os.Args) > 4 {
		releaseID = os.Args[4]
	}
	releaseID = strings.Trim(releaseID, "\"'")

	if err := listRollouts(ctx, w, projectID, locationID, deliveryPipelineID, releaseID); err != nil {
		log.Fatalf("listRollouts failed: %v", err)
	}
}
