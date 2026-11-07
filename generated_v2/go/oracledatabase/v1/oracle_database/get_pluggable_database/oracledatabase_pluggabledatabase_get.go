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

// [START oracledatabase_v1_oracledatabase_pluggabledatabase_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// getPluggableDatabase retrieves an existing pluggable database.
func getPluggableDatabase(ctx context.Context, w io.Writer, projectID string, locationID string, pluggableDatabaseID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/pluggableDatabases/%s", projectID, locationID, pluggableDatabaseID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("oracledatabase.NewClient: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.GetPluggableDatabaseRequest{
		Name: name,
	}

	pluggableDatabase, err := client.GetPluggableDatabase(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Retrieved Pluggable Database: %s\n", name)
			return nil
		}
		return fmt.Errorf("client.GetPluggableDatabase: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Pluggable Database: %s\n", pluggableDatabase.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_pluggabledatabase_get]
