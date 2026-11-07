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

// [START cloudbuild_v2_repositorymanager_connections_list]

import (
	"context"
	"fmt"
	"io"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv2"
	cloudbuildpb "cloud.google.com/go/cloudbuild/apiv2/cloudbuildpb"
	"google.golang.org/api/iterator"
)

// listConnections lists Cloud Build v2 connections in the specified project and location.
func listConnections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := cloudbuild.NewRepositoryManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRepositoryManagerClient: %w", err)
	}
	defer client.Close()

	req := &cloudbuildpb.ListConnectionsRequest{
		Parent: parent,
	}

	it := client.ListConnections(ctx, req)
	var count int
	for {
		connection, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListConnections: %w", err)
		}
		fmt.Fprintf(w, "Retrieved connection: %s\n", connection.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No connections found.")
	}

	return nil
}

// [END cloudbuild_v2_repositorymanager_connections_list]
