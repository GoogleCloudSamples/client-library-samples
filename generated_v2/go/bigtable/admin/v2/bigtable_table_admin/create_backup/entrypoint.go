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
	instanceID := os.Getenv("INSTANCE_ID")
	if instanceID == "" && len(os.Args) > 2 {
		instanceID = os.Args[2]
	}
	instanceID = strings.Trim(instanceID, "\"'")
	clusterID := os.Getenv("CLUSTER_ID")
	if clusterID == "" && len(os.Args) > 3 {
		clusterID = os.Args[3]
	}
	clusterID = strings.Trim(clusterID, "\"'")
	backupID := os.Getenv("BACKUP_ID")
	if backupID == "" && len(os.Args) > 4 {
		backupID = os.Args[4]
	}
	backupID = strings.Trim(backupID, "\"'")
	tableID := os.Getenv("TABLE_ID")
	if tableID == "" && len(os.Args) > 5 {
		tableID = os.Args[5]
	}
	tableID = strings.Trim(tableID, "\"'")

	if err := createBackup(ctx, w, projectID, instanceID, clusterID, backupID, tableID); err != nil {
		log.Fatalf("createBackup failed: %v", err)
	}
}
