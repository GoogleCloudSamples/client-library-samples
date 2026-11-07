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

// [START oracledatabase_v1_oracledatabase_autonomousdbversions_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/api/iterator"
)

// listAutonomousDbVersions lists Oracle Autonomous Database versions available in a location.
func listAutonomousDbVersions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.ListAutonomousDbVersionsRequest{
		Parent: parent,
	}

	it := client.ListAutonomousDbVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Environments without an active marketplace entitlement return an error.
			if strings.Contains(err.Error(), "marketplace order") || strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
				fmt.Fprintln(w, "Marketplace entitlement required to list Autonomous DB versions.")
				return nil
			}
			return fmt.Errorf("failed to retrieve Autonomous DB version: %w", err)
		}
		fmt.Fprintf(w, "Autonomous DB Version: %s (version: %s)\n", resp.GetName(), resp.GetVersion())
	}

	return nil
}

// [END oracledatabase_v1_oracledatabase_autonomousdbversions_list]
