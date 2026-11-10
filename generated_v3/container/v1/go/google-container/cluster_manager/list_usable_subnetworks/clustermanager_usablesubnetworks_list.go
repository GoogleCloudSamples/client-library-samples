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

// [START container_v1_clustermanager_usablesubnetworks_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	container "cloud.google.com/go/container/apiv1"
	containerpb "cloud.google.com/go/container/apiv1/containerpb"
	"google.golang.org/api/iterator"
)

// listUsableSubnetworks lists the subnetworks available for cluster creation.
func listUsableSubnetworks(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable not set")
	}

	client, err := container.NewClusterManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClusterManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &containerpb.ListUsableSubnetworksRequest{
		Parent: fmt.Sprintf("projects/%s", projectID),
	}

	it := client.ListUsableSubnetworks(ctx, req)
	for {
		subnetwork, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate usable subnetworks: %w", err)
		}
		fmt.Fprintf(w, "Subnetwork: %s\n", subnetwork.GetSubnetwork())
		fmt.Fprintf(w, "Network: %s\n", subnetwork.GetNetwork())
		fmt.Fprintf(w, "IP CIDR Range: %s\n", subnetwork.GetIpCidrRange())
	}

	return nil
}

// [END container_v1_clustermanager_usablesubnetworks_list]
