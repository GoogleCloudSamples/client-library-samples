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

// [START oracledatabase_v1_oracledatabase_odbnetwork_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	"cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// createOdbNetwork creates an Oracle Database network.
func createOdbNetwork(ctx context.Context, w io.Writer, projectID string, locationID string, odbNetworkID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	odbNetwork := &oracledatabasepb.OdbNetwork{
		Network: fmt.Sprintf("projects/%s/global/networks/example-network", projectID),
	}

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.CreateOdbNetworkRequest{
		Parent:       parent,
		OdbNetworkId: odbNetworkID,
		OdbNetwork:   odbNetwork,
	}

	op, err := client.CreateOdbNetwork(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") || strings.Contains(err.Error(), "marketplace order") {
			fmt.Fprintln(w, "A Google Cloud Marketplace entitlement is required to create an Oracle Database network.")
			return nil
		}
		return fmt.Errorf("CreateOdbNetwork failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") || strings.Contains(err.Error(), "marketplace order") {
			fmt.Fprintln(w, "A Google Cloud Marketplace entitlement is required to create an Oracle Database network.")
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created ODB network: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_odbnetwork_create]
