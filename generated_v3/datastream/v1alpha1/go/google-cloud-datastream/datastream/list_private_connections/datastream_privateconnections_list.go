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

// [START datastream_v1alpha1_datastream_privateconnections_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	datastreampb "cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
	"google.golang.org/api/iterator"
)

// listPrivateConnections lists Datastream private connections in a given location.
func listPrivateConnections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datastreampb.ListPrivateConnectionsRequest{
		Parent: parent,
	}

	it := client.ListPrivateConnections(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListPrivateConnections iteration failed: %w", err)
		}

		fmt.Fprintf(w, "Private connection: %s (state: %s)\n", resp.GetName(), resp.GetState())
	}

	return nil
}

// [END datastream_v1alpha1_datastream_privateconnections_list]
