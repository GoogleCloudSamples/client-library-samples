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

// [START oracledatabase_v1_oracledatabase_autonomousdatabases_list]

import (
	"context"
	"fmt"
	"io"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/api/iterator"
)

// listAutonomousDatabases lists Oracle Autonomous Databases in a specified project and location.
func listAutonomousDatabases(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.ListAutonomousDatabasesRequest{
		Parent: parent,
	}

	it := client.ListAutonomousDatabases(ctx, req)
	count := 0
	for {
		db, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate autonomous databases: %w", err)
		}
		fmt.Fprintf(w, "Found Autonomous Database: %s (Display Name: %s)\n", db.GetName(), db.GetDisplayName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No Autonomous Databases found.")
	}

	return nil
}

// [END oracledatabase_v1_oracledatabase_autonomousdatabases_list]
