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
	hubID := os.Getenv("HUB_ID")
	if hubID == "" && len(os.Args) > 2 {
		hubID = os.Args[2]
	}
	hubID = strings.Trim(hubID, "\"'")
	routeTableID := os.Getenv("ROUTE_TABLE_ID")
	if routeTableID == "" && len(os.Args) > 3 {
		routeTableID = os.Args[3]
	}
	routeTableID = strings.Trim(routeTableID, "\"'")
	routeID := os.Getenv("ROUTE_ID")
	if routeID == "" && len(os.Args) > 4 {
		routeID = os.Args[4]
	}
	routeID = strings.Trim(routeID, "\"'")

	if err := getRoute(ctx, w, projectID, hubID, routeTableID, routeID); err != nil {
		log.Fatalf("getRoute failed: %v", err)
	}
}
