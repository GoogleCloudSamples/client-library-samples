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

// [START servicedirectory_v1_registrationservice_endpoint_delete]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
)

// deleteEndpoint deletes an existing Service Directory endpoint.
func deleteEndpoint(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string, serviceID string, endpointID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s/services/%s/endpoints/%s", projectID, locationID, namespaceID, serviceID, endpointID)

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.DeleteEndpointRequest{
		Name: name,
	}

	if err := client.DeleteEndpoint(ctx, req); err != nil {
		return fmt.Errorf("DeleteEndpoint: %w", err)
	}

	fmt.Fprintf(w, "Deleted endpoint: %s\n", name)

	return nil
}

// [END servicedirectory_v1_registrationservice_endpoint_delete]
