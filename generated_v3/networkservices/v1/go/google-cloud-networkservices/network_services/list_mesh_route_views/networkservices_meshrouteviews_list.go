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
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	"google.golang.org/api/iterator"
)

// [START networkservices_v1_networkservices_meshrouteviews_list]

// listMeshRouteViews lists all MeshRouteViews in a mesh.
func listMeshRouteViews(ctx context.Context, w io.Writer, projectID string, locationID string, meshID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/meshes/%s", projectID, locationID, meshID)

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.ListMeshRouteViewsRequest{
		Parent: parent,
	}

	it := client.ListMeshRouteViews(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListMeshRouteViews failed: %w", err)
		}
		fmt.Fprintf(w, "Mesh route view: %s\n", resp.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintf(w, "No mesh route views found in %s\n", parent)
	}

	return nil
}

// [END networkservices_v1_networkservices_meshrouteviews_list]
