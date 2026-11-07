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

// [START servicedirectory_v1_registrationservice_endpoints_list]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
	"google.golang.org/api/iterator"
)

// listEndpoints lists all endpoints within a specified Service Directory service.
func listEndpoints(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string, serviceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s/services/%s", projectID, locationID, namespaceID, serviceID)

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.ListEndpointsRequest{
		Parent: parent,
	}

	it := client.ListEndpoints(ctx, req)
	for {
		endpoint, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate endpoints: %w", err)
		}
		fmt.Fprintf(w, "Endpoint: %s (Address: %s, Port: %d)\n", endpoint.GetName(), endpoint.GetAddress(), endpoint.GetPort())
	}

	return nil
}

// [END servicedirectory_v1_registrationservice_endpoints_list]
