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

// [START apigeeconnect_v1_connectionservice_connections_list]

import (
	"context"
	"fmt"
	"io"

	apigeeconnect "cloud.google.com/go/apigeeconnect/apiv1"
	apigeeconnectpb "cloud.google.com/go/apigeeconnect/apiv1/apigeeconnectpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listConnections lists the active connections for an Apigee Connect endpoint.
func listConnections(ctx context.Context, w io.Writer, projectID string, endpointID string) error {
	parent := fmt.Sprintf("projects/%s/endpoints/%s", projectID, endpointID)

	client, err := apigeeconnect.NewConnectionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewConnectionClient failed: %w", err)
	}
	defer client.Close()

	req := &apigeeconnectpb.ListConnectionsRequest{
		Parent: parent,
	}

	it := client.ListConnections(ctx, req)
	for {
		conn, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// The API returns InvalidArgument or NotFound when an endpoint has no active connections or is unregistered.
			if st, ok := status.FromError(err); ok && (st.Code() == codes.InvalidArgument || st.Code() == codes.NotFound) {
				fmt.Fprintf(w, "No active connections found for endpoint: %s\n", endpointID)
				return nil
			}
			return fmt.Errorf("failed to iterate connections: %w", err)
		}
		fmt.Fprintf(w, "Connection endpoint: %s\n", conn.GetEndpoint())
	}

	return nil
}

// [END apigeeconnect_v1_connectionservice_connections_list]
