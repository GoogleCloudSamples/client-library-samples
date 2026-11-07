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

// [START networkconnectivity_v1_hubservice_routetable_get]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	"cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
)

// getRouteTable retrieves a Network Connectivity Center route table.
func getRouteTable(ctx context.Context, w io.Writer, projectID string, hubID string, routeTableID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/hubs/%s/routeTables/%s", projectID, hubID, routeTableID)

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.GetRouteTableRequest{
		Name: name,
	}

	routeTable, err := client.GetRouteTable(ctx, req)
	if err != nil {
		return fmt.Errorf("GetRouteTable failed: %w", err)
	}

	fmt.Fprintf(w, "Route table: %s\n", routeTable.GetName())
	return nil
}

// [END networkconnectivity_v1_hubservice_routetable_get]
