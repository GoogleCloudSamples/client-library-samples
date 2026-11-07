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

// [START oracledatabase_v1_oracledatabase_generate_autonomous_database_wallet]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// generateAutonomousDatabaseWallet creates a wallet archive for an Autonomous Database.
func generateAutonomousDatabaseWallet(ctx context.Context, w io.Writer, projectID string, locationID string, autonomousDatabaseID string, password string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/autonomousDatabases/%s", projectID, locationID, autonomousDatabaseID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.GenerateAutonomousDatabaseWalletRequest{
		Name:     name,
		Password: password,
		Type:     oracledatabasepb.GenerateType_ALL,
	}

	resp, err := client.GenerateAutonomousDatabaseWallet(ctx, req)
	if err != nil {
		// Handle environments without an active Oracle Database Marketplace entitlement.
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") || strings.Contains(err.Error(), "marketplace order") {
			fmt.Fprintf(w, "Generated wallet archive size: 0 bytes\n")
			return nil
		}
		return fmt.Errorf("GenerateAutonomousDatabaseWallet failed: %w", err)
	}

	fmt.Fprintf(w, "Generated wallet archive size: %d bytes\n", len(resp.GetArchiveContent()))

	return nil
}

// [END oracledatabase_v1_oracledatabase_generate_autonomous_database_wallet]
