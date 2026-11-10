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
	endpointID := os.Getenv("ENDPOINT_ID")
	if endpointID == "" && len(os.Args) > 1 {
		endpointID = os.Args[1]
	}
	endpointID = strings.Trim(endpointID, "\"'")
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
	namespaceID := os.Getenv("NAMESPACE_ID")
	if namespaceID == "" && len(os.Args) > 4 {
		namespaceID = os.Args[4]
	}
	namespaceID = strings.Trim(namespaceID, "\"'")
	serviceID := os.Getenv("SERVICE_ID")
	if serviceID == "" && len(os.Args) > 5 {
		serviceID = os.Args[5]
	}
	serviceID = strings.Trim(serviceID, "\"'")

	if err := createEndpoint(ctx, w, endpointID, projectID, locationID, namespaceID, serviceID); err != nil {
		log.Fatalf("createEndpoint failed: %v", err)
	}
}
