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
	reportConfigID := os.Getenv("REPORT_CONFIG_ID")
	if reportConfigID == "" && len(os.Args) > 1 {
		reportConfigID = os.Args[1]
	}
	reportConfigID = strings.Trim(reportConfigID, "\"'")
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
	groupID := os.Getenv("GROUP_ID")
	if groupID == "" && len(os.Args) > 4 {
		groupID = os.Args[4]
	}
	groupID = strings.Trim(groupID, "\"'")
	preferenceSetID := os.Getenv("PREFERENCE_SET_ID")
	if preferenceSetID == "" && len(os.Args) > 5 {
		preferenceSetID = os.Args[5]
	}
	preferenceSetID = strings.Trim(preferenceSetID, "\"'")

	if err := createReportConfig(ctx, w, reportConfigID, projectID, locationID, groupID, preferenceSetID); err != nil {
		log.Fatalf("createReportConfig failed: %v", err)
	}
}
