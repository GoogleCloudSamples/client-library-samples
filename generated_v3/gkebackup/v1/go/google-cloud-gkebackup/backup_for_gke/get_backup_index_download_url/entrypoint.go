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
	backupPlanID := os.Getenv("BACKUP_PLAN_ID")
	if backupPlanID == "" && len(os.Args) > 3 {
		backupPlanID = os.Args[3]
	}
	backupPlanID = strings.Trim(backupPlanID, "\"'")
	backupID := os.Getenv("BACKUP_ID")
	if backupID == "" && len(os.Args) > 4 {
		backupID = os.Args[4]
	}
	backupID = strings.Trim(backupID, "\"'")

	if err := getBackupIndexDownloadUrl(ctx, w, projectID, locationID, backupPlanID, backupID); err != nil {
		log.Fatalf("getBackupIndexDownloadUrl failed: %v", err)
	}
}
