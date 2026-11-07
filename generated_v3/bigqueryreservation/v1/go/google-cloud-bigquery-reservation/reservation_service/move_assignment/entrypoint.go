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
	reservationID := os.Getenv("RESERVATION_ID")
	if reservationID == "" && len(os.Args) > 3 {
		reservationID = os.Args[3]
	}
	reservationID = strings.Trim(reservationID, "\"'")
	assignmentID := os.Getenv("ASSIGNMENT_ID")
	if assignmentID == "" && len(os.Args) > 4 {
		assignmentID = os.Args[4]
	}
	assignmentID = strings.Trim(assignmentID, "\"'")
	destinationID := os.Getenv("DESTINATION_ID")
	if destinationID == "" && len(os.Args) > 5 {
		destinationID = os.Args[5]
	}
	destinationID = strings.Trim(destinationID, "\"'")

	if err := moveAssignment(ctx, w, projectID, locationID, reservationID, assignmentID, destinationID); err != nil {
		log.Fatalf("moveAssignment failed: %v", err)
	}
}
