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
	databaseID := os.Getenv("DATABASE_ID")
	if databaseID == "" && len(os.Args) > 2 {
		databaseID = os.Args[2]
	}
	databaseID = strings.Trim(databaseID, "\"'")
	collectionID := os.Getenv("COLLECTION_ID")
	if collectionID == "" && len(os.Args) > 3 {
		collectionID = os.Args[3]
	}
	collectionID = strings.Trim(collectionID, "\"'")
	fieldID := os.Getenv("FIELD_ID")
	if fieldID == "" && len(os.Args) > 4 {
		fieldID = os.Args[4]
	}
	fieldID = strings.Trim(fieldID, "\"'")

	if err := getField(ctx, w, projectID, databaseID, collectionID, fieldID); err != nil {
		log.Fatalf("getField failed: %v", err)
	}
}
