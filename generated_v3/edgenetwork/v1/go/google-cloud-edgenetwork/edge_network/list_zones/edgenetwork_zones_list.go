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

// [START edgenetwork_v1_edgenetwork_zones_list]

import (
	"context"
	"fmt"
	"io"

	edgenetwork "cloud.google.com/go/edgenetwork/apiv1"
	edgenetworkpb "cloud.google.com/go/edgenetwork/apiv1/edgenetworkpb"
	"google.golang.org/api/iterator"
)

// listZones lists the Edge Network zones in a specified project and location.
func listZones(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := edgenetwork.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &edgenetworkpb.ListZonesRequest{
		Parent: parent,
	}

	it := client.ListZones(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListZones iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Zone: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No zones found.")
	}

	return nil
}

// [END edgenetwork_v1_edgenetwork_zones_list]
