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

// [START oracledatabase_v1_oracledatabase_database_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	"cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// getDatabase retrieves the details of an Oracle Database instance.
func getDatabase(ctx context.Context, w io.Writer, projectID string, regionID string, databaseID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/databases/%s", projectID, regionID, databaseID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("oracledatabase.NewClient: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.GetDatabaseRequest{
		Name: name,
	}

	resp, err := client.GetDatabase(ctx, req)
	if err != nil {
		// Accounts without an active Google Cloud Marketplace order return ENTITLEMENT_NOT_FOUND.
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Database retrieval requires an active marketplace order.\n")
			return nil
		}
		return fmt.Errorf("client.GetDatabase: %w", err)
	}

	fmt.Fprintf(w, "Retrieved database: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_database_get]
