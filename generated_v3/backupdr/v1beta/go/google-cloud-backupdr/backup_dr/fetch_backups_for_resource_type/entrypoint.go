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
	backupVaultID := os.Getenv("BACKUP_VAULT_ID")
	if backupVaultID == "" && len(os.Args) > 3 {
		backupVaultID = os.Args[3]
	}
	backupVaultID = strings.Trim(backupVaultID, "\"'")
	datasourceID := os.Getenv("DATASOURCE_ID")
	if datasourceID == "" && len(os.Args) > 4 {
		datasourceID = os.Args[4]
	}
	datasourceID = strings.Trim(datasourceID, "\"'")
	resourceType := os.Getenv("RESOURCE_TYPE")
	if resourceType == "" && len(os.Args) > 5 {
		resourceType = os.Args[5]
	}
	resourceType = strings.Trim(resourceType, "\"'")

	if err := fetchBackupsForResourceType(ctx, w, projectID, locationID, backupVaultID, datasourceID, resourceType); err != nil {
		log.Fatalf("fetchBackupsForResourceType failed: %v", err)
	}
}
