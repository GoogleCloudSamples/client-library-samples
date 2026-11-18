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

// [START oracledatabase_v1_oracledatabase_goldengateconnectiontypes_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/api/iterator"
)

// listGoldengateConnectionTypes lists GoldenGate connection types in a project and location.
func listGoldengateConnectionTypes(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.ListGoldengateConnectionTypesRequest{
		Parent: parent,
	}

	it := client.ListGoldengateConnectionTypes(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Environments without an active marketplace order return an entitlement error.
			if strings.Contains(err.Error(), "marketplace order") || strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
				fmt.Fprintln(w, "GoldenGate connection types require an active marketplace order.")
				return nil
			}
			return fmt.Errorf("failed to iterate connection types: %w", err)
		}
		fmt.Fprintf(w, "Connection type: %s\n", resp.GetName())
	}

	return nil
}

// [END oracledatabase_v1_oracledatabase_goldengateconnectiontypes_list]
