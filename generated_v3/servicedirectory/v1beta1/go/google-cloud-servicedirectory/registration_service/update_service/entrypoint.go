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
	namespaceID := os.Getenv("NAMESPACE_ID")
	if namespaceID == "" && len(os.Args) > 3 {
		namespaceID = os.Args[3]
	}
	namespaceID = strings.Trim(namespaceID, "\"'")
	serviceID := os.Getenv("SERVICE_ID")
	if serviceID == "" && len(os.Args) > 4 {
		serviceID = os.Args[4]
	}
	serviceID = strings.Trim(serviceID, "\"'")

	if err := updateService(ctx, w, projectID, locationID, namespaceID, serviceID); err != nil {
		log.Fatalf("updateService failed: %v", err)
	}
}
