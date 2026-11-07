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

// [START networkconnectivity_v1beta_transportmanager_transports_list]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listTransports lists network connectivity transports in the specified project and location.
func listTransports(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkconnectivity.NewTransportManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTransportManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListTransportsRequest{
		Parent: parent,
	}

	it := client.ListTransports(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTransports failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Transport: %s\n", resp.GetName())
	}

	if count == 0 {
		fmt.Fprintln(w, "No transports found.")
	}

	return nil
}

// [END networkconnectivity_v1beta_transportmanager_transports_list]
