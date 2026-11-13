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
	appProfileID := os.Getenv("APP_PROFILE_ID")
	if appProfileID == "" && len(os.Args) > 3 {
		appProfileID = os.Args[3]
	}
	appProfileID = strings.Trim(appProfileID, "\"'")

	if err := createAppProfile(ctx, w, projectID, instanceID, appProfileID); err != nil {
		log.Fatalf("createAppProfile failed: %v", err)
	}
}
