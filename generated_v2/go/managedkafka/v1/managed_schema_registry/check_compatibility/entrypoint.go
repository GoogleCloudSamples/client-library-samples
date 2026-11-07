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
	schemaRegistryID := os.Getenv("SCHEMA_REGISTRY_ID")
	if schemaRegistryID == "" && len(os.Args) > 3 {
		schemaRegistryID = os.Args[3]
	}
	schemaRegistryID = strings.Trim(schemaRegistryID, "\"'")
	subjectID := os.Getenv("SUBJECT_ID")
	if subjectID == "" && len(os.Args) > 4 {
		subjectID = os.Args[4]
	}
	subjectID = strings.Trim(subjectID, "\"'")

	if err := checkCompatibility(ctx, w, projectID, locationID, schemaRegistryID, subjectID); err != nil {
		log.Fatalf("checkCompatibility failed: %v", err)
	}
}
