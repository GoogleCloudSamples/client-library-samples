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

// [START servicedirectory_v1beta1_registrationservice_endpoint_create]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
)

// createEndpoint registers a network endpoint within an existing Service Directory service.
func createEndpoint(ctx context.Context, w io.Writer, endpointID string, projectID string, locationID string, namespaceID string, serviceID string) error {
	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s/services/%s", projectID, locationID, namespaceID, serviceID)
	endpoint := &servicedirectorypb.Endpoint{
		Address: "10.0.0.1",
		Port:    443,
	}

	req := &servicedirectorypb.CreateEndpointRequest{
		Parent:     parent,
		EndpointId: endpointID,
		Endpoint:   endpoint,
	}

	resp, err := client.CreateEndpoint(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEndpoint: %w", err)
	}

	fmt.Fprintf(w, "Created endpoint: %s\n", resp.GetName())
	return nil
}

// [END servicedirectory_v1beta1_registrationservice_endpoint_create]
